import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesCategoriesComponent } from './heroes-categories.component';

describe('HeroesCategoriesComponent', () => {
  let component: HeroesCategoriesComponent;
  let fixture: ComponentFixture<HeroesCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
