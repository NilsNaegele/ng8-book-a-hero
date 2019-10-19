import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-menus',
  templateUrl: './admin-menus.component.html',
  styleUrls: ['./admin-menus.component.scss']
})
export class AdminMenusComponent {

  nav: Observable<any>;
  selectedOption: any;
  dialogRef: MatDialogRef<any>;
  menuList: any;
  menuObject: any;

  constructor(
    public db: AngularFireDatabase,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.menuList = [];
    this.menuObject = {};
    this.nav = db.list('/menus/nav').valueChanges();

    this.nav.subscribe(items => {
      this.menuList = [];
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < items.length; x++) {
        this.menuList.push(items[x]);
      }
    });
  }

  addMenuItem() {
    this.menuList.push({
      label: '',
      url: ''
    });
  }

  saveMenu() {
    this.menuObject = this.menuList.reduce((acc, cur, i) => {
      acc[i] = cur;
      return acc;
    }, {});
    this.db.object('/menus/nav').set(this.menuObject);
    const snackBarRef = this.snackBar.open('Menu saved', 'OK!', {
      duration: 3000
    });
  }

  saveMenuItem(key: string, newLabel: string, newURL: string) {
    this.db.object('/menus/nav/' + key).update({
      label: newLabel,
      url: newURL
    });
    const snackBarRef = this.snackBar.open('Menu item saved', 'OK!', {
      duration: 3000
    });
  }

  deleteMenuItem(index: number) {
    this.menuList.splice(index, 1);
  }

}
