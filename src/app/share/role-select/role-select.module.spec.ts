/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RoleSelectModule } from './role-select.module';

describe( 'RoleSelectModule', () => {
  let roleSelectModule;

  beforeEach(() => {
    roleSelectModule = new RoleSelectModule();
  });

  it( 'should create an instance', () => {
    expect( roleSelectModule ).toBeTruthy();
  });
});
