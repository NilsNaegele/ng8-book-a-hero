import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeroesCategoryComponent } from './add-heroes-category.component';

describe('AddHeroesCategoryComponent', () => {
  let component: AddHeroesCategoryComponent;
  let fixture: ComponentFixture<AddHeroesCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHeroesCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHeroesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
