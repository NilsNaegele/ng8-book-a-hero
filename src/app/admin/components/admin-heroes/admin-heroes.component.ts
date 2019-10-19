import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminDeleteDialogComponent } from '../admin-delete-dialog/admin-delete-dialog.component';

@Component({
  selector: 'app-admin-heroes',
  templateUrl: './admin-heroes.component.html',
  styleUrls: ['./admin-heroes.component.scss']
})
export class AdminHeroesComponent {

  heroes: Observable<any>;
  hero: AngularFireObject<any>;
  selectedOption: any;
  dialogRef: MatDialogRef<any>;
  storageRef: any;
  currentAdmin: any;

  constructor(
    public af: FirebaseApp,
    public db: AngularFireDatabase,
    public globalService: GlobalService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.heroes = db.list('/heroes', ref => ref.orderByChild('rdateUpdated').limitToLast(9999)).snapshotChanges();
    this.storageRef = af.storage().ref();

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  onChange(e: any, key: string) {
    this.hero = this.db.object('/heroes/' + key);
    if (e.checked) {
      this.hero.update({published: true});
    } else {
      this.hero.update({published: false});
    }
  }

  deleteHero(hero: any) {
    const dialogRef = this.dialog.open(AdminDeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/heroes/' + hero.key).remove();
        if (hero.category) {
          this.db.object('/categories/' + hero.payload.val().category + '/heroes/' + hero.key).remove();
        }
        const snackBarRef = this.snackBar.open('Hero deleted', 'OK!', {
            duration: 3000
          });
      }
    });
  }

}
