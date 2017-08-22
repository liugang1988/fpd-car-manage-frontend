/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ParamSettingModule } from './param-setting.module';

describe( 'ParamSettingModule', () => {
  let paramSettingModule;

  beforeEach(() => {
    paramSettingModule = new ParamSettingModule();
  });

  it( 'should create an instance', () => {
    expect( paramSettingModule ).toBeTruthy();
  });
});
