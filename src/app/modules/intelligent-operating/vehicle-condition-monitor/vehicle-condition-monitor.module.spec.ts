/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { VehicleConditionMonitorModule } from './vehicle-condition-monitor.module';

describe( 'VehicleConditionMonitorModule', () => {
  let vehicleConditionMonitorModule;

  beforeEach(() => {
    vehicleConditionMonitorModule = new VehicleConditionMonitorModule();
  });

  it( 'should create an instance', () => {
    expect( vehicleConditionMonitorModule ).toBeTruthy();
  });
});
