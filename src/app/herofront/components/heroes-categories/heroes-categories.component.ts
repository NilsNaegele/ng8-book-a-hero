import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes-categories',
  templateUrl: './heroes-categories.component.html',
  styleUrls: ['./heroes-categories.component.scss']
})
export class HeroesCategoriesComponent implements OnInit {

  categories: Observable<any>;

  constructor(
    public db: AngularFireDatabase,
    private title: Title,
    private meta: Meta
  ) {
    this.categories = db.list('/categories', ref => ref.limitToLast(999)).valueChanges();
  }

  ngOnInit() {
    this.title.setTitle('Heroes');
    this.meta.updateTag({ content: 'Browse heroes and heroes categories' }, `name='description'`);
  }

}
