/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { LoadingModule } from './loading.module';

describe( 'LoadingModule', () => {
  let loadingModule;

  beforeEach(() => {
    loadingModule = new LoadingModule();
  });

  it( 'should create an instance', () => {
    expect( loadingModule ).toBeTruthy();
  });
});
