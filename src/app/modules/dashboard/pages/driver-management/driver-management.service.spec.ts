/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DriverManagementService } from './driver-management.service';

describe('DriverManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriverManagementService]
    });
  });

  it('should ...', inject([DriverManagementService], (service: DriverManagementService) => {
    expect(service).toBeTruthy();
  }));
});
