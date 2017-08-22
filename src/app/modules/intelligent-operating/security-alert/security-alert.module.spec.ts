/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SecurityAlertModule } from './security-alert.module';

describe( 'SecurityAlertModule', () => {
  let securityAlertModule;

  beforeEach(() => {
    securityAlertModule = new SecurityAlertModule();
  });

  it( 'should create an instance', () => {
    expect( securityAlertModule ).toBeTruthy();
  });
});
