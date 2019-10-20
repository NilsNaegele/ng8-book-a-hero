import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes-category',
  templateUrl: './heroes-category.component.html',
  styleUrls: ['./heroes-category.component.scss']
})
export class HeroesCategoryComponent implements OnInit {

  heroes: Observable<any[]>;
  categories: Observable<any[]>;
  category: Observable<any[]>;
  categoryObject: any;
  categoryName: string;
  categoryHeroes: any;
  @Input() categoryInput: any;

  constructor(
    public db: AngularFireDatabase,
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.categories = db.list('/categories').valueChanges();
    this.heroes = db.list('/heroes', ref => ref.orderByChild('published').equalTo(true)).valueChanges();
    this.categoryObject = {};
  }

  ngOnInit() {
    if (this.categoryInput) {
      this.category = this.categoryInput;
      this.categoryObject.slug = this.categoryInput.slug;
      this.categoryObject.name = this.categoryInput.name;
      this.categoryObject.heroes = Object.keys(this.categoryInput.heroes);
      this.heroes.subscribe((p: any) => {
        this.categoryHeroes = p.filter((item) => {
          return item.category === this.categoryInput.entityKey;
        });
      });
    } else {
      this.route.params.subscribe((params: Params) => {
        this.category = this.db.list('/categories', ref => ref.orderByChild('slug').equalTo(params.slug)).valueChanges();

        this.category.subscribe((cat: any) => {
          this.categoryObject.slug = cat[0].slug;
          this.categoryObject.name = cat[0].name;
          this.categoryObject.heroes = Object.keys(cat[0].heroes);
          this.heroes.subscribe((p: any) => {
            this.categoryHeroes = p.filter((item: any) => {
              return item.category === cat[0].entityKey;
            });
          });

          this.title.setTitle(this.categoryObject.name);
          this.meta.addTag({ name: 'description', content: 'View all heroes in the ' + this.categoryObject.name + ' category' });
        });
      });
    }
  }

  getHeroImage(hero: any) {
    if (hero && hero.thumbnail) {
      return hero.thumbnail;
    } else {
      return '../../assets/placeholder.jpg';
    }
  }

}
