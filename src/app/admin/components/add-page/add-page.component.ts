import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { GlobalService } from 'src/app/services/global.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { AdminDeleteDialogComponent } from '../admin-delete-dialog/admin-delete-dialog.component';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  pages: Observable<any>;
  newURL: string;
  newTitle: string;
  newBody: string;
  newPublished: boolean;
  currentAdmin: any;
  editMode: boolean;
  pageKey: string;
  selectedOption: string;
  currentModeratedPages: AngularFireList<any>;
  entityObject: any;
  currentPage: Observable<any>;
  awaitingApproval: string;

  constructor(
    public db: AngularFireDatabase,
    public snackBar: MatSnackBar,
    public globalService: GlobalService,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.newPublished = false;
    this.pages = db.list('/pages').valueChanges();
    this.globalService.admin.subscribe(admin => {
      this.currentAdmin = admin;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.key) {
          this.editMode = true;
          this.pageKey = params.key;

          if (this.router.url.includes('approval')) {
            this.currentPage = this.db.object('/approvals/pages/' + params.key).valueChanges();
            this.db.object('/approvals/pages/' + this.pageKey).valueChanges().subscribe((approvalPage: any) => {
              this.entityObject = approvalPage;
            });
          } else {
            this.currentPage = this.db.object('/pages/' + params.key).valueChanges();

            // check to see if any approvals are awaiting on this page
            this.db.list('/approvals/pages', ref => ref.orderByChild('entityKey').equalTo(params.key)).snapshotChanges()
              .subscribe((approval: any) => {
                if (approval.length > 0 && approval[0]) {
                  this.awaitingApproval = approval[0].key;
                }
            });
          }

          this.currentPage.subscribe(p => {
            if (p) {
              this.newURL = p.url;
              this.newTitle = p.title;
              this.newBody = p.body;
              this.newPublished = p.published;
            }
          });
        } else {
          this.newURL = null;
          this.newTitle = null;
          this.newBody = null;
          this.newPublished = false;
        }
    });
  }

  addPage(newURL: string, newTitle: string, newBody: string, newPublished: boolean) {

    if (!newPublished) {
      newPublished = false;
    }

    if (newURL && newTitle && newBody && this.currentAdmin.uid) {

      const pageObject = {
        url: newURL,
        dateUpdated: Date.now().toString(),
        rdateUpdated: (Date.now() * -1).toString(),
        title: newTitle,
        body: newBody,
        published: newPublished,
        updatedBy: this.currentAdmin.uid,
        entityKey: this.editMode && this.pageKey ? this.pageKey : null
      };

      if (this.editMode && this.pageKey) {
        this.db.object('/pages/' + this.pageKey).update(pageObject);
      } else {
        this.db.list('/pages').push(pageObject).then((item) => {
          this.db.object('/pages/' + item.key + '/entityKey').set(item.key);
        });
      }

      const snackBarRef = this.snackBar.open('Page saved', 'OK!', {
        duration: 3000
      });
    }

    this.validateFields(newURL, newTitle, newBody);
  }

  submitForModeration(newURL: string, newTitle: string, newBody: string, newPublished: boolean) {
    if (!newPublished) {
      newPublished = false;
    }

    if (newURL && newTitle && newBody && this.currentAdmin.uid) {

      const approvalObject = {
        entityKey: this.router.url.includes('approval') ? this.entityObject.entityKey : this.pageKey,
        url: newURL,
        dateUpdated: Date.now().toString(),
        rdateUpdated: (Date.now() * -1).toString(),
        title: newTitle,
        body: newBody,
        published: newPublished,
        updatedBy: this.currentAdmin.uid
      };

      if (this.editMode && this.pageKey) {
        this.currentModeratedPages = this.db.list('/approvals/pages/');

        // tslint:disable-next-line: max-line-length
        const adminApprovalPages = this.db.list('/approvals/pages/', ref => ref.orderByChild('updatedBy').equalTo(this.currentAdmin.uid)).valueChanges();

        adminApprovalPages.pipe(take(1)).subscribe((approvals: any) => {
          let matchingApprovals = [];
          if (this.router.url.includes('approval')) {
            matchingApprovals = approvals.filter((match) => {
              return match.entityKey === this.entityObject.entityKey;
            });
          } else {
            matchingApprovals = approvals.filter((match) => {
              return match.entityKey === this.pageKey;
            });
          }
          if (matchingApprovals.length === 0 || !this.router.url.includes('approval')) {
            this.currentModeratedPages.push(approvalObject);
          } else {
            this.db.object('/approvals/pages/' + this.pageKey).update(approvalObject);
          }
        });
      } else {
          this.db.list('/approvals/pages/').push(approvalObject);
      }
      const snackBarRef = this.snackBar.open('Page submitted for moderation', 'OK!', {
        duration: 3000
      });
      snackBarRef.onAction().subscribe(() => {
        this.router.navigateByUrl('admin/approvals');
      });
    }

    this.validateFields(newURL, newTitle, newBody);
  }

  approveItem(newURL: string, newTitle: string, newBody: string, newPublished: boolean) {
    if (this.entityObject.entityKey) {
      const ogEntity = this.db.object('/pages/' + this.entityObject.entityKey);
      ogEntity.set(this.entityObject);
    } else {
      this.db.list('/pages').push(this.entityObject);
    }

    this.db.object('/approvals/pages/' + this.pageKey).remove();
    const snackBarRef = this.snackBar.open('Page approved', 'OK!', {
      duration: 3000
    });
    this.router.navigateByUrl('admin/pages');
  }

  deleteItem(event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AdminDeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/approvals/pages/' + this.pageKey).remove();
        const snackBarRef = this.snackBar.open('Draft deleted', 'OK!', {
          duration: 3000
        });
        this.router.navigateByUrl('admin/pages');
      }
    });
  }

  validateFields(url: string, title: string, body: string) {
    if (!url) {
      const snackBarRef = this.snackBar.open('You must add a URL for this page', 'OK!', {
        duration: 3000
      });
    } else if (!title) {
      const snackBarRef = this.snackBar.open('You must add a title for this page', 'OK!', {
        duration: 3000
      });
    } else if (!body) {
      const snackBarRef = this.snackBar.open('You must add content to the page', 'OK!', {
        duration: 3000
      });
    }
  }

}
