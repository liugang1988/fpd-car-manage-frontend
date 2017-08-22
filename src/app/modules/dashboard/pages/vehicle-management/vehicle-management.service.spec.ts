/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleManagementService } from './vehicle-management.service';

describe('VehicleManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleManagementService]
    });
  });

  it('should ...', inject([VehicleManagementService], (service: VehicleManagementService) => {
    expect(service).toBeTruthy();
  }));
});
