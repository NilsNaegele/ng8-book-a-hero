import { Component, OnInit } from '@angular/core';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-theme',
  templateUrl: './admin-theme.component.html',
  styleUrls: ['./admin-theme.component.scss']
})
export class AdminThemeComponent implements OnInit {

  theme: AngularFireObject<any>;
  siteName: string;

  constructor(public db: AngularFireDatabase, public snackBar: MatSnackBar) {
    this.theme = db.object('/theme');
  }

  ngOnInit() {
    this.theme.valueChanges().subscribe((item: any) => {
      if (item && item.siteName) {
        this.siteName = item.siteName;
      }
    });
  }

  saveTheme(newSiteName: string) {
    this.theme.update({
      siteName: newSiteName
    });

    const snackBarRef = this.snackBar.open('Theme updated', 'OK!', {
      duration: 3000
    });
  }

}
