/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DeviceInModule } from './device-in.module';

describe( 'DeviceInModule', () => {
  let deviceInModule;

  beforeEach(() => {
    deviceInModule = new DeviceInModule();
  });

  it( 'should create an instance', () => {
    expect( deviceInModule ).toBeTruthy();
  });
});
