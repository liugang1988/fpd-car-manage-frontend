/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DriverManageService } from './driver-manage.service';

describe('DriverManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriverManageService]
    });
  });

  it('should ...', inject([DriverManageService], (service: DriverManageService) => {
    expect(service).toBeTruthy();
  }));
});
