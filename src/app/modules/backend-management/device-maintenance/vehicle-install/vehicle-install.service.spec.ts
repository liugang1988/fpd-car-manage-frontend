/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleInstallService } from './vehicle-install.service';

describe('VehicleInstallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleInstallService]
    });
  });

  it('should ...', inject([VehicleInstallService], (service: VehicleInstallService) => {
    expect(service).toBeTruthy();
  }));
});
