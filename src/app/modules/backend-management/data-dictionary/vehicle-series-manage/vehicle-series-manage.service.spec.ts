import { TestBed, inject } from '@angular/core/testing';

import { VehicleSeriesManageService } from './vehicle-series-manage.service';

describe('VehicleSeriesManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleSeriesManageService]
    });
  });

  it('should ...', inject([VehicleSeriesManageService], (service: VehicleSeriesManageService) => {
    expect(service).toBeTruthy();
  }));
});
