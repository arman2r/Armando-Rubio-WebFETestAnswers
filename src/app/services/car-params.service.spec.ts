import { TestBed } from '@angular/core/testing';

import { CarParamsService } from './car-params.service';

describe('CarParamsService', () => {
  let service: CarParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
