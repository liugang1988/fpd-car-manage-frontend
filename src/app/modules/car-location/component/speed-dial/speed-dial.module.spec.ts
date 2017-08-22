/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SpeedDialModule } from './speed-dial.module';

describe( 'SpeedDialModule', () => {
  let speedDialModule;

  beforeEach(() => {
    speedDialModule = new SpeedDialModule();
  });

  it( 'should create an instance', () => {
    expect( speedDialModule ).toBeTruthy();
  });
});
