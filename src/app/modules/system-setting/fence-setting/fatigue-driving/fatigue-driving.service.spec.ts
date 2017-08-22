import { TestBed, inject } from '@angular/core/testing';

import { FatigueDrivingService } from './fatigue-driving.service';

describe('FatigueDrivingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FatigueDrivingService]
    });
  });

  it('should ...', inject([FatigueDrivingService], (service: FatigueDrivingService) => {
    expect(service).toBeTruthy();
  }));
});
