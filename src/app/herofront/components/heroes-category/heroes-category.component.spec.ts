import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesCategoryComponent } from './heroes-category.component';

describe('HeroesCategoryComponent', () => {
  let component: HeroesCategoryComponent;
  let fixture: ComponentFixture<HeroesCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
