/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { LogManageModule } from './log-manage.module';

describe( 'LogManageModule', () => {
  let logManageModule;

  beforeEach(() => {
    logManageModule = new LogManageModule();
  });

  it( 'should create an instance', () => {
    expect( logManageModule ).toBeTruthy();
  });
});
