import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { AdminDeleteDialogComponent } from '../admin-delete-dialog/admin-delete-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss']
})
export class AdminPagesComponent {

  pages: Observable<any>;
  page: AngularFireObject<any>;
  selectedOption: any;
  dialogRef: MatDialogRef<any>;
  currentAdmin: any;

  constructor(
    public db: AngularFireDatabase,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public globalService: GlobalService
  ) {
    this.pages = db.list('/pages', ref => ref.orderByChild('rdateUpdated').limitToFirst(9999)).snapshotChanges();

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  onChange(e: any, key: string) {
    this.page = this.db.object('/pages/' + key);
    if (e.checked) {
      this.page.update({published: true});
    } else {
      this.page.update({published: false});
    }
  }

  deletePage(key: string) {
    const dialogRef = this.dialog.open(AdminDeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/pages/' + key).remove();

        const snackBarRef = this.snackBar.open('Page deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }

}
