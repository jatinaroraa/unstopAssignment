import { TestBed } from '@angular/core/testing';

import { TrainseatsService } from './trainseats.service';

describe('TrainseatsService', () => {
  let service: TrainseatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainseatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
