import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeroesCategoriesComponent } from './admin-heroes-categories.component';

describe('AdminHeroesCategoriesComponent', () => {
  let component: AdminHeroesCategoriesComponent;
  let fixture: ComponentFixture<AdminHeroesCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHeroesCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeroesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
