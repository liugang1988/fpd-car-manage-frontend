import { TestBed, inject } from '@angular/core/testing';
import { DailyCarService } from './daily-car.service';

describe('DriverRankService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailyCarService]
    });
  });

  it('should ...', inject([DailyCarService], (service: DailyCarService) => {
    expect(service).toBeTruthy();
  }));
});
