import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AdminDeleteDialogComponent } from '../admin-delete-dialog/admin-delete-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-admins',
  templateUrl: './admin-admins.component.html',
  styleUrls: ['./admin-admins.component.scss']
})
export class AdminAdminsComponent implements OnInit {

  admins: Observable<any>;
  selectedOption: any;
  dialogRef: MatDialogRef<any>;
  adminsObject: any;

  constructor(public db: AngularFireDatabase, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.admins = db.list('/admins', ref => ref.orderByChild('email').limitToFirst(9999)).snapshotChanges();

    this.admins.subscribe((adminList: any) => {
      this.adminsObject = adminList;
    });
  }

  countAdmin(email: string) {
    const matches = this.adminsObject.filter((item) => {
      return item.payload.val().email === email;
    });
    return matches.length;
  }

  deleteAdmin(event, key: string) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AdminDeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/admins/' + key).remove();

        const snackBarRef = this.snackBar.open('Admin deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }

  ngOnInit() {

  }

}
