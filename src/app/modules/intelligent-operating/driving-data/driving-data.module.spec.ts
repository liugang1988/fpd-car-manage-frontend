/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DrivingDataModule } from './driving-data.module';

describe( 'DrivingDataModule', () => {
  let drivingDataModule;

  beforeEach(() => {
    drivingDataModule = new DrivingDataModule();
  });

  it( 'should create an instance', () => {
    expect( drivingDataModule ).toBeTruthy();
  });
});
