/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { PowerManageModule } from './power-manage.module';

describe( 'PowerManageModule', () => {
  let powerManageModule;

  beforeEach(() => {
    powerManageModule = new PowerManageModule();
  });

  it( 'should create an instance', () => {
    expect( powerManageModule ).toBeTruthy();
  });
});
