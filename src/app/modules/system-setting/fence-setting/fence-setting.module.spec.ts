/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FenceSettingModule } from './fence-setting.module';

describe( 'FenceSettingModule', () => {
  let fenceSettingModule;

  beforeEach(() => {
    fenceSettingModule = new FenceSettingModule();
  });

  it( 'should create an instance', () => {
    expect( fenceSettingModule ).toBeTruthy();
  });
});
