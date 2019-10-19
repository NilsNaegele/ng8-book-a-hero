import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { AdminDeleteDialogComponent } from '../admin-delete-dialog/admin-delete-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss']
})
export class AdminPostsComponent {

  posts: Observable<any>;
  post: AngularFireObject<any>;
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
    this.posts = db.list('/posts').snapshotChanges();

    this.storageRef = af.storage().ref();

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  onChange(e: any, key: string) {
    this.post = this.db.object('/posts/' + key);
    if (e.checked) {
      this.post.update({published: true});
    } else {
      this.post.update({published: false});
    }
  }

  deletePost(post: any) {
    const dialogRef = this.dialog.open(AdminDeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/posts/' + post.key).remove();

        const snackBarRef = this.snackBar.open('Post deleted', 'OK!', {
            duration: 3000
          });
      }
    });
  }

}
