import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { GlobalService } from 'src/app/services/global.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  orders: AngularFireList<any>;
  order: any;
  editMode: boolean;
  orderKey: string;
  countries: any;
  statuses: Array<any>;
  users: AngularFireList<any>;

  constructor(
    public db: AngularFireDatabase,
    public snackBar: MatSnackBar,
    public globalService: GlobalService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.countries = globalService.countries;
    this.statuses = globalService.orderStatuses;
    this.orders = db.list('/orders');
    this.users = db.list('/users');
    this.order = { shipping: {}, billing: {} };
  }

  addOrder(newOrder): void {
    if (newOrder) {
      if (this.editMode && this.orderKey) {
        this.db.object('/orders/' + this.orderKey).update(newOrder);
      } else {
        this.orders.push(newOrder);
      }

      const snackBarRef = this.snackBar.open('Order saved', 'OK!', {
        duration: 3000
      });
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        if (params && params.key) {
          this.editMode = true;
          this.orderKey = params.key;
          this.db.object('/orders/' + params.key).valueChanges().subscribe((o: any) => {
            this.order = o;
          });
        } else {
          this.order = { shipping: {}, billing: {} };
        }
    });
  }

}
