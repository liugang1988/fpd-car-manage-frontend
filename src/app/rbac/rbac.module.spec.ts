/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RbacModule } from './rbac.module';

describe( 'RbacModule', () => {
  let rbacModule;

  beforeEach(() => {
    rbacModule = new RbacModule();
  });

  it( 'should create an instance', () => {
    expect( rbacModule ).toBeTruthy();
  });
});
