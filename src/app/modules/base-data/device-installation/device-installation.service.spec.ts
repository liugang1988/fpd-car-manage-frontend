/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeviceInstallationService } from './device-installation.service';

describe('DeviceInstallationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceInstallationService]
    });
  });

  it('should ...', inject([DeviceInstallationService], (service: DeviceInstallationService) => {
    expect(service).toBeTruthy();
  }));
});
