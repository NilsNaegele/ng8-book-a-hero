import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  clients: AngularFireList<any>;
  client: AngularFireObject<any>;
  newEmail: string;
  editMode: boolean;
  clientKey: string;

  constructor(
    public db: AngularFireDatabase,
    public snackBar: MatSnackBar,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.clients = db.list('/users');
  }

  addClient(newEmail: string): void {
    if (newEmail) {
      if (this.editMode && this.clientKey) {
        this.db.object('/users/' + this.clientKey).update({
          email: newEmail
        });
      } else {
        this.clients.push({
          email: newEmail,
          status: 'inactive'
        });
      }

      const snackBarRef = this.snackBar.open('Client saved', 'OK!', {
        duration: 3000
      });

    } else if (!newEmail) {
      const snackBarRef = this.snackBar.open('You must add an email for this client', 'OK!', {
        duration: 3000
      });
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.uid) {
          this.editMode = true;
          this.clientKey = params.uid;
          this.db.object('/users/' + params.uid).valueChanges().subscribe((u: any) => {
            this.newEmail = u.email;
          });
        } else {
          this.newEmail = null;
        }
    });
  }

}
