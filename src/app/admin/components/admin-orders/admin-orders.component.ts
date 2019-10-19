import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { GlobalService } from 'src/app/services/global.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdminDeleteDialogComponent } from '../admin-delete-dialog/admin-delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  orders: Observable<any[]>;
  users: Observable<any[]>;
  selectedOption: string;
  currentAdmin: any;

  constructor(
    public db: AngularFireDatabase,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public globalService: GlobalService,
    public router: Router,
    public route: ActivatedRoute
  ) {

    this.users = db.list('/users').valueChanges();

    if (router.url.includes('customer')) {
      this.route.params.subscribe((params: Params) => {
        this.orders = db.list('/orders', ref => ref.orderByChild('uid').equalTo(params.key).limitToFirst(99999)).snapshotChanges();
      });
    } else {
      this.orders = db.list('/orders', ref => ref.orderByChild('rdate').limitToFirst(99999)).snapshotChanges();
    }

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  ngOnInit() {
  }

  deleteOrder(event, key: string) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AdminDeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'delete') {
        this.db.object('/orders/' + key).remove();
        this.db.object('/users/orders/' + key).remove();

        const snackBarRef = this.snackBar.open('Order deleted', 'OK!', {
          duration: 3000
        });
      }
    });
  }

}
