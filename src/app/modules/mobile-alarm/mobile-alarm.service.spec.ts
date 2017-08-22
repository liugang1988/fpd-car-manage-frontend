import { TestBed, inject } from '@angular/core/testing';

import { MobileAlarmService } from './mobile-alarm.service';

describe('MobileAlarmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MobileAlarmService]
    });
  });

  it('should ...', inject([MobileAlarmService], (service: MobileAlarmService) => {
    expect(service).toBeTruthy();
  }));
});
