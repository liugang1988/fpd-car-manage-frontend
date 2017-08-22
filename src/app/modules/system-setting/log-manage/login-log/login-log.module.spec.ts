/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { LoginLogModule } from './login-log.module';

describe( 'LoginLogModule', () => {
  let loginLogModule;

  beforeEach(() => {
    loginLogModule = new LoginLogModule();
  });

  it( 'should create an instance', () => {
    expect( loginLogModule ).toBeTruthy();
  });
});
