import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { FirebaseApp } from 'angularfire2';
import { GlobalService } from 'src/app/services/global.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';
import { AdminDeleteDialogComponent } from '../admin-delete-dialog/admin-delete-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss']
})
export class AddHeroComponent implements OnInit {

  heroes: AngularFireList<any>;
  categories: Observable<any>;
  ogCategory: string;
  newTitle: string;
  newThumbnail: string;
  newDescription: string;
  newPrice: string;
  newPublished: boolean;
  newCategory: any;
  newWeight: number;
  currentAdmin: any;
  editMode: boolean;
  heroKey: string;
  storageRef: any;
  file: any;
  imageUrl: any;
  currentHero: AngularFireObject<any>;
  currentModeratedHeroes: AngularFireList<any>;
  entityObject: any;
  dialogRef: MatDialogRef<any>;
  selectedOption: string;
  awaitingApproval: string;

  constructor(
    public af: FirebaseApp,
    public db: AngularFireDatabase,
    public snackBar: MatSnackBar,
    public globalService: GlobalService,
    public router: Router,
    public route: ActivatedRoute,
    private fb: FirebaseApp,
    public dialog: MatDialog
  ) {
    this.newPublished = false;
    this.heroes = db.list('/heroes');
    this.categories = db.list('/categories').snapshotChanges();

    this.globalService.admin.subscribe(admin => {
      this.currentAdmin = admin;

      const adminApprovalHeroes = this.db.list('/approvals/heroes/', ref => ref.orderByChild('updatedBy').equalTo(this.currentAdmin.uid));
      adminApprovalHeroes.valueChanges().subscribe(response => {
        console.log(!response);
      });
    });

    this.storageRef = af.storage().ref();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.key) {
          this.editMode = true;
          this.heroKey = params.key;

          if (this.router.url.includes('approval')) {
            this.currentHero = this.db.object('/approvals/heroes/' + params.key);
            this.db.object('/approvals/heroes/' + params.key).valueChanges().pipe(take(1)).subscribe((p: any) => {
              if (p.category) {
                this.ogCategory = p.category;
              }
            });
            this.db.object('/approvals/heroes/' + this.heroKey).valueChanges().subscribe((approvalHero: any) => {
              this.entityObject = approvalHero;
            });
          } else {
            this.currentHero = this.db.object('/heroes/' + params.key);
            this.db.object('/heroes/' + params.key).valueChanges().pipe(take(1)).subscribe((p: any) => {
              if (p.category) {
                this.ogCategory = p.category;
              }
            });

            // check to see if any approvals are awaiting on this hero
            this.db.list('/approvals/heroes', ref => ref.orderByChild('entityKey').equalTo(params.key)).valueChanges()
              .subscribe((approval: any) => {
                if (approval.length > 0 && approval[0]) {
                  this.awaitingApproval = approval[0].key;
                }
            });
          }

          this.currentHero.valueChanges().subscribe((p: any) => {
            this.newTitle = p.title;
            this.newDescription = p.description;
            this.newPrice = p.price;
            this.newPublished = p.published;
            this.newCategory = p.category;
            this.newWeight = p.weight;

            if (p.thumbnail) {
              this.imageUrl = p.thumbnail;
              this.newThumbnail = p.thumbnail;
            }
          });
        } else {
          this.newTitle = null;
          this.newThumbnail = null;
          this.newDescription = null;
          this.newPrice = null;
          this.newCategory = null;
          this.newWeight = 0;
          this.newPublished = false;
        }
    });
  }

  handleFiles(e) {
    this.file = e.srcElement.files[0];
    if (this.file.size > 2097152) {
      const snackBarRef = this.snackBar.open('Images must be 2 MB or less', 'OK!', {
        duration: 3000
      });
    } else {
      this.uploadImage();
    }
  }

  uploadImage() {
    const storageRef = firebase.storage().ref();
    const path = Date.now().toString() + '-' + this.file.name;
    const imageRef = storageRef.child('heroes/' + path);
    const me = this;
    imageRef.put(this.file).then((snapshot) => {
        const snackBarRef = this.snackBar.open('Image uploaded', 'OK!', {
          duration: 3000
        });
        this.storageRef.child('heroes/' + path).getDownloadURL().then((url) => {
          me.imageUrl = url;
          me.newThumbnail = url;
        });
    });
  }

  deleteImage() {
    this.newThumbnail = null;
  }

  deleteImageRef() {
    const storage = firebase.storage();
    const imageRef = storage.refFromURL(this.imageUrl);

    const me = this;
    imageRef.delete().then(() => {
      me.imageUrl = null;
    }).catch((error) => {
      console.log('error', error);
    });
  }

  validateFields(title, description, price) {
    if (!title) {
      const snackBarRef = this.snackBar.open('You must add a title for this hero', 'OK!', {
        duration: 3000
      });
    } else if (!description) {
      const snackBarRef = this.snackBar.open('You must add a description to the hero', 'OK!', {
        duration: 3000
      });
    } else if (!price) {
      const snackBarRef = this.snackBar.open('You must add a price to the hero', 'OK!', {
        duration: 3000
      });
    }
  }

  updateCategory(ogCat: string, newCat: string, key: string) {
    if (ogCat && newCat) {
      this.db.object('/categories/' + ogCat + '/heroes/' + key).remove();
      this.db.object('/categories/' + newCat + '/heroes/' + key).set(Date.now().toString());
    } else if (ogCat && !newCat) {
      this.db.object('/categories/' + ogCat + '/heroes/' + key).remove();
    } else if (!ogCat && newCat) {
      this.db.object('/categories/' + newCat + '/heroes/' + key).set(Date.now().toString());
    }
  }

  addHero(newTitle: string, newPrice: string, newCategory: any, newWeight: number, newDescription: string, newPublished: boolean) {
    if (!newPublished) {
      newPublished = false;
    }

    if (newTitle && newPrice && newDescription && this.currentAdmin.uid) {

      const heroObject = {
        url: this.globalService.slugify(newTitle),
        dateUpdated: Date.now().toString(),
        rdateUpdated: (Date.now() * -1).toString(),
        title: newTitle,
        thumbnail: this.newThumbnail ? this.newThumbnail : null,
        description: newDescription,
        price: newPrice,
        published: newPublished,
        updatedBy: this.currentAdmin.uid,
        weight: newWeight,
        category: newCategory ? newCategory : null,
        entityKey: this.editMode && this.heroKey ? this.heroKey : null
      };


      if (this.editMode && this.heroKey) {
        this.currentHero = this.db.object('/heroes/' + this.heroKey);
        this.currentHero.update(heroObject);
        this.updateCategory(this.ogCategory, this.newCategory, this.heroKey);
      } else {
        this.heroes.push(heroObject).then((item) => {
          if (this.newCategory) {
            this.db.object('/heroes/' + item.key + '/entityKey').set(item.key);
            this.db.object('/categories/' + this.newCategory + '/heroes/' + item.key).set(Date.now().toString());
          }
        });
      }

      const snackBarRef = this.snackBar.open('Hero saved', 'OK!', {
        duration: 3000
      });
    }

    this.validateFields(newTitle, newDescription, newPrice);
  }

  // tslint:disable-next-line: max-line-length
  submitForModeration(newTitle: string, newPrice: string, newCategory: any, newWeight: number, newDescription: string, newPublished: boolean) {
    if (!newPublished) {
      newPublished = false;
    }

    if (newTitle && newPrice && newDescription && this.currentAdmin.uid) {

      const approvalObject = {
        entityKey: this.router.url.includes('approval') ? this.entityObject.entityKey : this.heroKey,
        url: this.globalService.slugify(newTitle),
        dateUpdated: Date.now().toString(),
        rdateUpdated: (Date.now() * -1).toString(),
        title: newTitle,
        thumbnail: this.newThumbnail ? this.newThumbnail : null,
        description: newDescription,
        price: newPrice,
        published: newPublished,
        weight: newWeight,
        updatedBy: this.currentAdmin.uid,
        category: newCategory ? newCategory : null
      };

      if (this.editMode && this.heroKey) {

        this.currentModeratedHeroes = this.db.list('/approvals/heroes/');

        // tslint:disable-next-line: max-line-length
        const adminApprovalHeroes = this.db.list('/approvals/heroes/', ref => ref.orderByChild('updatedBy').equalTo(this.currentAdmin.uid)).valueChanges();
        adminApprovalHeroes.pipe(take(1)).subscribe((approvals: any) => {

          let matchingApprovals = [];
          if (this.router.url.includes('approval')) {
            matchingApprovals = approvals.filter((match) => {
              return match.entityKey === this.entityObject.entityKey;
            });
          } else {
            matchingApprovals = approvals.filter((match) => {
              return match.entityKey === this.heroKey;
            });
          }

          if (matchingApprovals.length === 0 || !this.router.url.includes('approval')) {
            this.currentModeratedHeroes.push(approvalObject);
          } else {
            this.db.object('/approvals/heroes/' + this.heroKey).update(approvalObject);
          }
        });
      } else {
          this.db.list('/approvals/heroes/').push(approvalObject);
      }
      const snackBarRef = this.snackBar.open('Hero submitted for moderation', 'OK!', {
        duration: 3000
      });
      snackBarRef.onAction().subscribe(() => {
        this.router.navigateByUrl('admin/approvals');
      });
    }

    this.validateFields(newTitle, newDescription, newPrice);
  }

  approveItem(newTitle: string, newPrice: string, newCategory: any, newDescription: string, newPublished: boolean) {
    if (this.entityObject.entityKey) {
      const ogEntity = this.db.object('/heroes/' + this.entityObject.entityKey);
      ogEntity.valueChanges().pipe(take(1)).subscribe((item: any) => {
        this.updateCategory(item.category, this.entityObject.category, this.entityObject.entityKey);
        ogEntity.set(this.entityObject);
      });
    } else {
      this.db.list('/heroes').push(this.entityObject).then((item) => {
        if (this.entityObject.category) {
          this.db.object('/categories/' + this.entityObject.category + '/heroes/' + item.key).set(Date.now());
        }
      });
    }

    this.db.object('/approvals/heroes/' + this.heroKey).remove();
    const snackBarRef = this.snackBar.open('Hero approved', 'OK!', {
      duration: 3000
    });
    this.router.navigateByUrl('admin/heroes');
  }

  deleteItem(event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AdminDeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/approvals/heroes/' + this.heroKey).remove();
        const snackBarRef = this.snackBar.open('Draft deleted', 'OK!', {
          duration: 3000
        });
        this.router.navigateByUrl('admin/heroes');
      }
    });
  }

}
