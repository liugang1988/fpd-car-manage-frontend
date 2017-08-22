/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FatigueDrivingModule } from './fatigue-driving.module';

describe( 'FatigueDrivingModule', () => {
  let fatigueDrivingModule;

  beforeEach(() => {
    fatigueDrivingModule = new FatigueDrivingModule();
  });

  it( 'should create an instance', () => {
    expect( fatigueDrivingModule ).toBeTruthy();
  });
});
