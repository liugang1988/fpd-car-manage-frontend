/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FastSearchModule } from './fast-search.module';

describe( 'FastSearchModule', () => {
  let fastSearchModule;

  beforeEach(() => {
    fastSearchModule = new FastSearchModule();
  });

  it( 'should create an instance', () => {
    expect( fastSearchModule ).toBeTruthy();
  });
});
