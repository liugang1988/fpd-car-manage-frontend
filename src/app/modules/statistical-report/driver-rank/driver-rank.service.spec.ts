import { TestBed, inject } from '@angular/core/testing';
import { DriverRankService } from './driver-rank.service';

describe('DriverRankService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriverRankService]
    });
  });

  it('should ...', inject([DriverRankService], (service: DriverRankService) => {
    expect(service).toBeTruthy();
  }));
});
