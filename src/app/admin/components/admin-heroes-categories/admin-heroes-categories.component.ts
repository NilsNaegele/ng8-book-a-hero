import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { AdminDeleteDialogComponent } from '../admin-delete-dialog/admin-delete-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-heroes-categories',
  templateUrl: './admin-heroes-categories.component.html',
  styleUrls: ['./admin-heroes-categories.component.scss']
})
export class AdminHeroesCategoriesComponent {

  categories: Observable<any>;
  dialogRef: MatDialogRef<any>;
  selectedOption: any;
  currentAdmin: any;

  constructor(
    public db: AngularFireDatabase,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public globalService: GlobalService
  ) {
    this.categories = db.list('/categories').snapshotChanges();

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  deleteCategory(category: any) {
    const dialogRef = this.dialog.open(AdminDeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/categories/' + category.key).remove();

        const snackBarRef = this.snackBar.open('Category deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }

}
