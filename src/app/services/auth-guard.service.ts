import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  auth: Observable<firebase.User>;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
  ) {
    this.auth = afAuth.authState;
  }

  canActivate(): Promise<boolean> {
    return new Promise(Resolve => {
      this.auth.subscribe(state => {
        if (state) {
          return Resolve(true);
        } else {
          this.router.navigate(['/login']);
          return Resolve(false);
        }
      });
    });
  }
}
