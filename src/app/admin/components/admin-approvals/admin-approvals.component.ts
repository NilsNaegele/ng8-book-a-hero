import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminApproveDialogComponent } from '../admin-approve-dialog/admin-approve-dialog.component';
import { take } from 'rxjs/operators';
import { AdminDeleteDialogComponent } from '../admin-delete-dialog/admin-delete-dialog.component';

@Component({
  selector: 'app-admin-approvals',
  templateUrl: './admin-approvals.component.html',
  styleUrls: ['./admin-approvals.component.scss']
})
export class AdminApprovalsComponent {

  heroApprovals: Observable<any>;
  categoryApprovals: Observable<any>;
  pageApprovals: Observable<any>;
  postApprovals: Observable<any>;
  selectedOption: any;
  dialogRef: MatDialogRef<any>;
  users: Observable<any>;
  currentAdmin: any;

  constructor(
    public db: AngularFireDatabase,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public globalService: GlobalService
  ) {
    this.heroApprovals = db.list('/approvals/heroes').snapshotChanges();
    this.categoryApprovals = db.list('/approvals/categories').snapshotChanges();
    this.pageApprovals = db.list('/approvals/pages').snapshotChanges();
    this.postApprovals = db.list('/approvals/posts').snapshotChanges();
    this.users = db.list('/users').valueChanges();

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  approveItem(event, entity: string, entityObject: any, ogKey: string) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AdminApproveDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'approve') {
        if (entityObject.entityKey) {
          const ogEntity = this.db.object('/' + entity + '/' + entityObject.entityKey);
          ogEntity.valueChanges().pipe(take(1)).subscribe((item: any) => {
            if (entity === 'heroes' && item.category && entityObject.category) {
              this.db.object('/categories/' + item.category + '/heroes/' + entityObject.entityKey).remove();
              this.db.object('/categories/' + entityObject.category + '/heroes/' + entityObject.entityKey).set(Date.now().toString());
            } else if (entity === 'heroes' && item.category && !entityObject.category) {
              this.db.object('/categories/' + item.category + '/heroes/' + entityObject.entityKey).remove();
            } else if (entity === 'heroes' && !item.category && entityObject.category) {
              this.db.object('/categories/' + entityObject.category + '/heroes/' + entityObject.entityKey).set(Date.now().toString());
            }
            ogEntity.set(entityObject);
          });
        } else {
          this.db.list('/' + entity).push(entityObject).then((item) => {
            if (entity === 'heroes' && entityObject.category) {
              this.db.object('/categories/' + entityObject.category + '/heroes/' + item.key).set(Date.now().toString());
            }
          });
        }

        this.db.object('/approvals/' + entity + '/' + ogKey).remove();
        const snackBarRef = this.snackBar.open('Item approved', 'OK!', {
          duration: 3000
        });
      }
    });
  }

  deleteItem(event, entity: string, key: string) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AdminDeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/approvals/' + entity + '/' + key).remove();
        const snackBarRef = this.snackBar.open('Item deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }

}
