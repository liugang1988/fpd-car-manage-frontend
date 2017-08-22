/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { CarStatusModule } from './car-status.module';

describe( 'CarStatusModule', () => {
  let carStatusModule;

  beforeEach(() => {
    carStatusModule = new CarStatusModule();
  });

  it( 'should create an instance', () => {
    expect( carStatusModule ).toBeTruthy();
  });
});
