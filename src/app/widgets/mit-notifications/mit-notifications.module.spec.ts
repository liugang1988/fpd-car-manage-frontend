/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MitNotificationsModule } from './mit-notifications.module';

describe( 'MitNotificationsModule', () => {
  let mitNotificationsModule;

  beforeEach(() => {
    mitNotificationsModule = new MitNotificationsModule();
  });

  it( 'should create an instance', () => {
    expect( mitNotificationsModule ).toBeTruthy();
  });
});
