import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title, Meta } from '@angular/platform-browser';
import * as firebase from 'firebase';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  admin: Observable<firebase.User>;
  newEmail: string;
  newPassword: string;
  showSignUp: boolean;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public globalService: GlobalService,
    public router: Router,
    public snackBar: MatSnackBar,
    private title: Title,
    private meta: Meta
  ) {

    this.admin = afAuth.authState;

    if (this.router.url.includes('login')) {
      this.showSignUp = false;
    } else if (this.router.url.includes('register')) {
      this.showSignUp = true;
    }

    this.admin.subscribe(currentAdmin => {

      if (currentAdmin) {
        db.object('/admins/' + this.globalService.hashCode(currentAdmin.email)).valueChanges()
        .pipe(take(1)).subscribe((admin: any) => {
          if (admin && admin.role) {
            this.db.object('/admins/' + currentAdmin.uid).update({
              uid: currentAdmin.uid,
              email: currentAdmin.email,
              photoURL: currentAdmin.photoURL,
              role: admin.role,
              active: true
            }).catch((err) => {
              console.log('Permission Error', err);
              this.router.navigateByUrl('');
              const snackBarRef = this.snackBar.open('You are not an authorized administrator', 'OK!', {
                duration: 3000
              });
            });

            this.router.navigateByUrl('admin');
          } else {
            this.router.navigateByUrl('');
          }
        });
      }
    });
  }

  ngOnInit() {
    this.title.setTitle('Login');
    this.meta.updateTag({ content: 'Login to the admin panel' }, `name='description'`);
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  signUpWithEmail() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.newEmail, this.newPassword).catch((error) => {
      const snackBarRef = this.snackBar.open(error.message, 'OK!', {
        duration: 3000
      });
    });
  }

  loginWithEmail() {
    this.afAuth.auth.signInWithEmailAndPassword(this.newEmail, this.newPassword).catch((error) => {
      const snackBarRef = this.snackBar.open(error.message, 'OK!', {
        duration: 3000
      });
    });
  }

}
