import { TestBed, inject } from '@angular/core/testing';

import { VehicleStyleManageService } from './vehicle-style-manage.service';

describe('VehicleStyleManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleStyleManageService]
    });
  });

  it('should ...', inject([VehicleStyleManageService], (service: VehicleStyleManageService) => {
    expect(service).toBeTruthy();
  }));
});
