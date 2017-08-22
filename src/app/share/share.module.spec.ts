/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ShareModule } from './share.module';

describe( 'ShareModule', () => {
  let shareModule;

  beforeEach(() => {
    shareModule = new ShareModule();
  });

  it( 'should create an instance', () => {
    expect( shareModule ).toBeTruthy();
  });
});
