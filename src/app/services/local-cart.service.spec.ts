import { TestBed } from '@angular/core/testing';

import { LocalCartService } from './local-cart.service';

describe('LocalCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalCartService = TestBed.get(LocalCartService);
    expect(service).toBeTruthy();
  });
});
