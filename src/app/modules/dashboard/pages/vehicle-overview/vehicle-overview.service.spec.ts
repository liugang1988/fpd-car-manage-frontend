/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleOverviewService } from './vehicle-overview.service';

describe('VehicleOverviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleOverviewService]
    });
  });

  it('should ...', inject([VehicleOverviewService], (service: VehicleOverviewService) => {
    expect(service).toBeTruthy();
  }));
});
