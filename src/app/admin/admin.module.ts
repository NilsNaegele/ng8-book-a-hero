import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { CKEditorModule } from 'ng2-ckeditor';
import { DndModule } from 'ng2-dnd';

import { AdminRoutingModule } from './admin-routing.module';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { AddPageComponent } from './components/add-page/add-page.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AddHeroesCategoryComponent } from './components/add-heroes-category/add-heroes-category.component';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { AdminAdminsComponent } from './components/admin-admins/admin-admins.component';
import { AdminClientsComponent } from './components/admin-clients/admin-clients.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminMenusComponent } from './components/admin-menus/admin-menus.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminPagesComponent } from './components/admin-pages/admin-pages.component';
import { AdminPostsComponent } from './components/admin-posts/admin-posts.component';
import { AdminHeroesCategoriesComponent } from './components/admin-heroes-categories/admin-heroes-categories.component';
import { AdminHeroesComponent } from './components/admin-heroes/admin-heroes.component';
import { AdminThemeComponent } from './components/admin-theme/admin-theme.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminApproveDialogComponent } from './components/admin-approve-dialog/admin-approve-dialog.component';
import { AdminDeleteDialogComponent } from './components/admin-delete-dialog/admin-delete-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './herofront/components/order/order.component';



@NgModule({
  declarations: [
            AddAdminComponent,
            AddClientComponent,
            AddOrderComponent,
            AddPageComponent,
            AddPostComponent,
            AddHeroesCategoryComponent,
            AddHeroComponent,
            AdminAdminsComponent,
            AdminClientsComponent,
            AdminDashboardComponent,
            AdminMenusComponent,
            AdminOrdersComponent,
            AdminPagesComponent,
            AdminPostsComponent,
            AdminHeroesCategoriesComponent,
            AdminHeroesComponent,
            AdminThemeComponent,
            AdminComponent,
            AdminApproveDialogComponent,
            AdminDeleteDialogComponent,
            OrderComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    CKEditorModule,
    DndModule.forRoot(),
  ]
})
export class AdminModule { }
