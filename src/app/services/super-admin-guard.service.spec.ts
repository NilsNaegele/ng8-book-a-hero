import { TestBed } from '@angular/core/testing';

import { SuperAdminGuardService } from './super-admin-guard.service';

describe('SuperAdminGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuperAdminGuardService = TestBed.get(SuperAdminGuardService);
    expect(service).toBeTruthy();
  });
});
