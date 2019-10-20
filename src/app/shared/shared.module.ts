import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetKeyPipe } from './pipes/get-key.pipe';
import { GetUserPipe } from './pipes/get-user.pipe';
import { ObjectCounterPipe } from './pipes/object-counter.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { RouterModule } from '@angular/router';
import { OrderComponent } from '../herofront/components/order/order.component';

const pipes = [
  GetKeyPipe,
  GetUserPipe,
  ObjectCounterPipe,
  SafeHtmlPipe,
  SortPipe,
  TruncatePipe,
  SearchPipe
];

@NgModule({
  declarations: [...pipes, OrderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    ...pipes,
    OrderComponent,
    RouterModule
  ]
})
export class SharedModule { }
