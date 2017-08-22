import { TestBed, inject } from '@angular/core/testing';
import { DrivingBehaviorService } from './driving-behavior.service';

describe('DrivingBehaviorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrivingBehaviorService]
    });
  });

  it('should ...', inject([DrivingBehaviorService], (service: DrivingBehaviorService) => {
    expect(service).toBeTruthy();
  }));
});
