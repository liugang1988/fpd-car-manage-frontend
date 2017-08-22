/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { VehicleInstallModule } from './vehicle-install.module';

describe( 'VehicleInstallModule', () => {
  let vehicleInstallModule;

  beforeEach(() => {
    vehicleInstallModule = new VehicleInstallModule();
  });

  it( 'should create an instance', () => {
    expect( vehicleInstallModule ).toBeTruthy();
  });
});
