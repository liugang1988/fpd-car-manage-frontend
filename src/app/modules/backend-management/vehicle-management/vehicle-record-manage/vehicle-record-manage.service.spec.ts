import { TestBed, inject } from '@angular/core/testing';

import { VehicleRecordManageService } from './vehicle-record-manage.service';

describe('VehicleRecordManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleRecordManageService]
    });
  });

  it('should ...', inject([VehicleRecordManageService], (service: VehicleRecordManageService) => {
    expect(service).toBeTruthy();
  }));
});
