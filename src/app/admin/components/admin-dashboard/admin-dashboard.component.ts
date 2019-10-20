import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  posts: Observable<any[]>;
  pages: Observable<any[]>;
  admins: Observable<any[]>;
  heroes: Observable<any[]>;
  customers: Observable<any[]>;
  categories: Observable<any[]>;
  orders: Observable<any[]>;
  approvals: Observable<any>;
  approvalsTotal: number;
  currentAdmin: any;
  columns: number;

  constructor(public db: AngularFireDatabase, public globalService: GlobalService) {
    this.posts = db.list('/posts').valueChanges();
    this.pages = db.list('/pages').valueChanges();
    this.admins = db.list('/admins').valueChanges();
    this.customers = db.list('/users').valueChanges();
    this.heroes = db.list('/heroes').valueChanges();
    this.categories = db.list('/categories').valueChanges();
    this.orders = db.list('/orders').valueChanges();
    this.approvals = db.object('/approvals').valueChanges();

    // this.posts.subscribe

    this.columns = 3;
    this.approvalsTotal = 0;

    this.globalService.admin.subscribe((a) => {
      this.currentAdmin = a;
    });
  }

  ngOnInit() {
    this.approvals.subscribe((a: any) => {
      if (a && a.heroes) {
        this.approvalsTotal += Object.keys(a.heroes).length;
      }
      if (a && a.pages) {
        this.approvalsTotal += Object.keys(a.pages).length;
      }
      if (a && a.posts) {
        this.approvalsTotal += Object.keys(a.posts).length;
      }
    });
  }

  onResize(event) {
    const element = event.target.innerWidth;

    if (element < 950) {
      this.columns = 2;
    }

    if (element > 950) {
      this.columns = 3;
    }

    if (element < 750) {
      this.columns = 1;
    }
  }

}
