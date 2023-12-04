import { TestBed } from '@angular/core/testing';

import { GetFiltersService } from './get-filters.service';

describe('GetFiltersService', () => {
  let service: GetFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
