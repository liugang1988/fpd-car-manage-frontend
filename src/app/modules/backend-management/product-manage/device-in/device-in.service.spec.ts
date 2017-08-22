/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeviceInService } from './device-in.service';

describe('DeviceInService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceInService]
    });
  });

  it('should ...', inject([DeviceInService], (service: DeviceInService) => {
    expect(service).toBeTruthy();
  }));
});
