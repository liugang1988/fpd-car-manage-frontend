/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SingleVehicleModule } from './single-vehicle.module';

describe( 'SingleVehicleModule', () => {
  let singleVehicleModule;

  beforeEach(() => {
    singleVehicleModule = new SingleVehicleModule();
  });

  it( 'should create an instance', () => {
    expect( singleVehicleModule ).toBeTruthy();
  });
});
