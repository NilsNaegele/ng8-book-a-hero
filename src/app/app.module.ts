import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';


import { AppComponent } from './app.component';
import { HeroesComponent } from './herofront/components/heroes/heroes.component';
import { HeroesCategoriesComponent } from './herofront/components/heroes-categories/heroes-categories.component';
import { HeroesCategoryComponent } from './herofront/components/heroes-category/heroes-category.component';
import { SharedModule } from './shared/shared.module';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroesCategoriesComponent,
    HeroesCategoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase, 'ng8-book-a-hero'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
