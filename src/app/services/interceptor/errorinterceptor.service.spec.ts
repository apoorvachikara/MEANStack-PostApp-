import { TestBed } from '@angular/core/testing';

import { ErrorinterceptorService } from './errorinterceptor.service';

describe('ErrorinterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorinterceptorService = TestBed.get(ErrorinterceptorService);
    expect(service).toBeTruthy();
  });
});
