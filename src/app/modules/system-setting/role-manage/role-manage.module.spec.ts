/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RoleManageModule } from './role-manage.module';

describe( 'RoleManageModule', () => {
  let roleManageModule;

  beforeEach(() => {
    roleManageModule = new RoleManageModule();
  });

  it( 'should create an instance', () => {
    expect( roleManageModule ).toBeTruthy();
  });
});
