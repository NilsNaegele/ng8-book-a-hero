import { AdminApproveDialogComponent } from './components/admin-approve-dialog/admin-approve-dialog.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { AddPageComponent } from './components/add-page/add-page.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminMenusComponent } from './components/admin-menus/admin-menus.component';
import { AdminPagesComponent } from './components/admin-pages/admin-pages.component';
import { AdminPostsComponent } from './components/admin-posts/admin-posts.component';
import { AdminThemeComponent } from './components/admin-theme/admin-theme.component';
import { AdminAdminsComponent } from './components/admin-admins/admin-admins.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { AddHeroesCategoryComponent } from './components/add-heroes-category/add-heroes-category.component';
import { AdminClientsComponent } from './components/admin-clients/admin-clients.component';
import { AdminHeroesCategoriesComponent } from './components/admin-heroes-categories/admin-heroes-categories.component';
import { AdminHeroesComponent } from './components/admin-heroes/admin-heroes.component';
import { AuthGuard } from '../services/auth-guard.service';
import { AdminGuard } from '../services/admin-guard.service';
import { SuperAdminGuard } from '../services/super-admin-guard.service';
import { OrderComponent } from '../herofront/components/order/order.component';


const adminRoutes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'add-client', component: AddClientComponent, canActivate: [AdminGuard] },
          { path: 'add-order', component: AddOrderComponent, canActivate: [AdminGuard] },
          { path: 'add-page', component: AddPageComponent },
          { path: 'add-post', component: AddPostComponent },
          { path: 'add-hero', component: AddHeroComponent },
          { path: 'add-heroes-category', component: AddHeroesCategoryComponent },
          { path: 'add-admin', component: AddAdminComponent, canActivate: [SuperAdminGuard] },
          { path: 'approvals', component: AdminApproveDialogComponent },
          { path: 'category-approval/:key', component: AddHeroesCategoryComponent },
          { path: 'page-approval/:key', component: AddPageComponent },
          { path: 'hero-approval/:key', component: AddHeroComponent },
          { path: 'post-approval/:key', component: AddPostComponent },
          { path: 'hero-categories', component: AdminHeroesCategoriesComponent },
          { path: 'client/:key', component: AdminOrdersComponent, canActivate: [AdminGuard] },
          { path: 'clients', component: AdminClientsComponent, canActivate: [AdminGuard] },
          { path: 'edit-admin/:key', component: AddAdminComponent, canActivate: [SuperAdminGuard] },
          { path: 'edit-client/:uid', component: AddClientComponent, canActivate: [AdminGuard] },
          { path: 'edit-order/:key', component: AddOrderComponent, canActivate: [AdminGuard] },
          { path: 'edit-page/:key', component: AddPageComponent },
          { path: 'edit-post/:key', component: AddPostComponent },
          { path: 'edit-hero/:key', component: AddHeroComponent },
          { path: 'edit-heroes-category/:key', component: AddHeroesCategoryComponent },
          { path: 'menus', component: AdminMenusComponent, canActivate: [AdminGuard] },
          { path: 'orders', component: AdminOrdersComponent, canActivate: [AdminGuard] },
          { path: 'order/:key', component: OrderComponent, canActivate: [AdminGuard] },
          { path: 'pages', component: AdminPagesComponent },
          { path: 'posts', component: AdminPostsComponent },
          { path: 'heros', component: AdminHeroesComponent },
          { path: 'theme', component: AdminThemeComponent, canActivate: [AdminGuard] },
          { path: 'admins', component: AdminAdminsComponent, canActivate: [SuperAdminGuard] },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
