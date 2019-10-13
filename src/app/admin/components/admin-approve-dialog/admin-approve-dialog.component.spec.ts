import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveDialogComponent } from './admin-approve-dialog.component';

describe('AdminApproveDialogComponent', () => {
  let component: AdminApproveDialogComponent;
  let fixture: ComponentFixture<AdminApproveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApproveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApproveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
