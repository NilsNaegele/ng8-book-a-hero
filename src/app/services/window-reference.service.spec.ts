import { TestBed } from '@angular/core/testing';

import { WindowReferenceService } from './window-reference.service';

describe('WindowReferenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowReferenceService = TestBed.get(WindowReferenceService);
    expect(service).toBeTruthy();
  });
});
