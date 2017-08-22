/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { VehicleManagementModule } from './vehicle-management.module';

describe( 'VehicleManagementModule', () => {
  let vehicleManagementModule;

  beforeEach(() => {
    vehicleManagementModule = new VehicleManagementModule();
  });

  it( 'should create an instance', () => {
    expect( vehicleManagementModule ).toBeTruthy();
  });
});
