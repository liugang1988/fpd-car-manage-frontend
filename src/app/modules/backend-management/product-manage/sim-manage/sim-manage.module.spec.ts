/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SimManageModule } from './sim-manage.module';

describe( 'SimManageModule', () => {
  let simManageModule;

  beforeEach(() => {
    simManageModule = new SimManageModule();
  });

  it( 'should create an instance', () => {
    expect( simManageModule ).toBeTruthy();
  });
});
