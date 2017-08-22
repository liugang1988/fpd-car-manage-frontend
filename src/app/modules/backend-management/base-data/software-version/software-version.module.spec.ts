/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SoftwareVersionModule } from './software-version.module';

describe( 'SoftwareVersionModule', () => {
  let softwareVersionModule;

  beforeEach(() => {
    softwareVersionModule = new SoftwareVersionModule();
  });

  it( 'should create an instance', () => {
    expect( softwareVersionModule ).toBeTruthy();
  });
});
