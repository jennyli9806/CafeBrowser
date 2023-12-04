import { TestBed } from '@angular/core/testing';

import { GetDepotsService } from './get-depots.service';

describe('GetDepotsService', () => {
  let service: GetDepotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDepotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
