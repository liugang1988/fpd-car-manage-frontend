/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FuelConsumptionModule } from './fuel-consumption.module';

describe( 'FuelConsumptionModule', () => {
  let fuelConsumptionModule;

  beforeEach(() => {
    fuelConsumptionModule = new FuelConsumptionModule();
  });

  it( 'should create an instance', () => {
    expect( fuelConsumptionModule ).toBeTruthy();
  });
});
