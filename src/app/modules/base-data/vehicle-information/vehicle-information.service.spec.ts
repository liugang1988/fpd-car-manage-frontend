/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleInformationService } from './vehicle-information.service';

describe('VehicleInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleInformationService]
    });
  });

  it('should ...', inject([VehicleInformationService], (service: VehicleInformationService) => {
    expect(service).toBeTruthy();
  }));
});
