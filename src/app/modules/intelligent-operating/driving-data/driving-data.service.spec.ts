/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrivingDataService } from './driving-data.service';

describe('DrivingDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrivingDataService]
    });
  });

  it('should ...', inject([DrivingDataService], (service: DrivingDataService) => {
    expect(service).toBeTruthy();
  }));
});
