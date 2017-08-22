/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MitPipeModule } from './mit-pipe.module';

describe( 'MitPipeModule', () => {
  let mitPipeModule;

  beforeEach(() => {
    mitPipeModule = new MitPipeModule();
  });

  it( 'should create an instance', () => {
    expect( mitPipeModule ).toBeTruthy();
  });
});
