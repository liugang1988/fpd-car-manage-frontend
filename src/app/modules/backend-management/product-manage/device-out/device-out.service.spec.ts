/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeviceOutService } from './device-out.service';

describe('DeviceOutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceOutService]
    });
  });

  it('should ...', inject([DeviceOutService], (service: DeviceOutService) => {
    expect(service).toBeTruthy();
  }));
});
