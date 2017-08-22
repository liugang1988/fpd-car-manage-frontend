/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { VehicleSelectModule } from './vehicle-select.module';

describe( 'VehicleSelectModule', () => {
  let vehicleSelectModule;

  beforeEach(() => {
    vehicleSelectModule = new VehicleSelectModule();
  });

  it( 'should create an instance', () => {
    expect( vehicleSelectModule ).toBeTruthy();
  });
});
