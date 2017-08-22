import { TestBed, inject } from '@angular/core/testing';

import { VehicleOffLineService } from './vehicle-off-line.service';

describe('VehicleOffLineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleOffLineService]
    });
  });

  it('should ...', inject([VehicleOffLineService], (service: VehicleOffLineService) => {
    expect(service).toBeTruthy();
  }));
});
