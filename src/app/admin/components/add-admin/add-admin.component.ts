import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  newEmail: string;
  newRole: string;
  currentAdmin: Observable<any>;
  editMode: boolean;
  adminKey: string;

  constructor(
    public db: AngularFireDatabase,
    public snackBar: MatSnackBar,
    public router: Router,
    public route: ActivatedRoute,
    public globalService: GlobalService
  ) {
    this.editMode = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.key) {
          this.editMode = true;
          this.adminKey = params.key;
          this.currentAdmin = this.db.object('/admins/' + params.key).valueChanges();

          this.currentAdmin.subscribe((a: any) => {
            this.newEmail = a.email;
            this.newRole = a.role;
          });
        } else {
          this.newEmail = null;
          this.newRole = 'editor';
        }
    });
  }

  addAdmin(newEmail: string, newRole: string): void {
    if (newEmail && newRole) {

      this.db.object('/admins/' + this.globalService.hashCode(newEmail)).update({
        email: newEmail,
        role: newRole
      });

      this.newEmail = null;
      this.newRole = null;

      const snackBarRef = this.snackBar.open('Admin saved', 'OK!', {
        duration: 3000
      });

    } else if (!newEmail) {
      const snackBarRef = this.snackBar.open('You must add an email for the user', 'OK!', {
        duration: 3000
      });
    } else if (!newRole) {
      const snackBarRef = this.snackBar.open('You must add a role for the user', 'OK!', {
        duration: 3000
      });
    }
  }

}
