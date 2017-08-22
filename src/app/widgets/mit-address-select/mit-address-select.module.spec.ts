/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MitAddressSelectModule } from './mit-address-select.module';

describe( 'MitAddressSelectModule', () => {
  let mitAddressSelectModule;

  beforeEach(() => {
    mitAddressSelectModule = new MitAddressSelectModule();
  });

  it( 'should create an instance', () => {
    expect( mitAddressSelectModule ).toBeTruthy();
  });
});
