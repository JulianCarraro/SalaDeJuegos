import { TestBed } from '@angular/core/testing';

import { ApiMayorMenorService } from './api-mayor-menor.service';

describe('ApiMayorMenorService', () => {
  let service: ApiMayorMenorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMayorMenorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
