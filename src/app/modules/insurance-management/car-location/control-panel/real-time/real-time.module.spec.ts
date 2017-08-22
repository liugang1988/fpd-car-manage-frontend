/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RealTimeModule } from './real-time.module';

describe( 'RealTimeModule', () => {
  let realTimeModule;

  beforeEach(() => {
    realTimeModule = new RealTimeModule();
  });

  it( 'should create an instance', () => {
    expect( realTimeModule ).toBeTruthy();
  });
});
