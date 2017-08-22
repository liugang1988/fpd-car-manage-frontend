/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SingleVehicleService } from './single-vehicle.service';

describe('SingleVehicleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SingleVehicleService]
    });
  });

  it('should ...', inject([SingleVehicleService], (service: SingleVehicleService) => {
    expect(service).toBeTruthy();
  }));
});
