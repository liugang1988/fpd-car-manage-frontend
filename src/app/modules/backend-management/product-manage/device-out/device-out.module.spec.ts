/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DeviceOutModule } from './device-out.module';

describe( 'DeviceOutModule', () => {
  let deviceOutModule;

  beforeEach(() => {
    deviceOutModule = new DeviceOutModule();
  });

  it( 'should create an instance', () => {
    expect( deviceOutModule ).toBeTruthy();
  });
});
