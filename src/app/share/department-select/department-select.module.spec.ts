/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DepartmentSelectModule } from './department-select.module';

describe( 'DepartmentSelectModule', () => {
  let departmentSelectModule;

  beforeEach(() => {
    departmentSelectModule = new DepartmentSelectModule();
  });

  it( 'should create an instance', () => {
    expect( departmentSelectModule ).toBeTruthy();
  });
});
