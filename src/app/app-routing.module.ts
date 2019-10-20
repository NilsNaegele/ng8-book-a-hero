import { HeroesCategoriesComponent } from './herofront/components/heroes-categories/heroes-categories.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './herofront/components/heroes/heroes.component';
import { LoginComponent } from './herofront/components/login/login.component';


const routes: Routes = [
  { path: '', component: HeroesCategoriesComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  {
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
