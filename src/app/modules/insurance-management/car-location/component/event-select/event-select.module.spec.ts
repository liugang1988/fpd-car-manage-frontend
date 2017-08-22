/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { EventSelectModule } from './event-select.module';

describe( 'EventSelectModule', () => {
  let eventSelectModule;

  beforeEach(() => {
    eventSelectModule = new EventSelectModule();
  });

  it( 'should create an instance', () => {
    expect( eventSelectModule ).toBeTruthy();
  });
});
