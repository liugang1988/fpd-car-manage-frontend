/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleConditionMonitorService } from './vehicle-condition-monitor.service';

describe('VehicleConditionMonitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleConditionMonitorService]
    });
  });

  it('should ...', inject([VehicleConditionMonitorService], (service: VehicleConditionMonitorService) => {
    expect(service).toBeTruthy();
  }));
});
