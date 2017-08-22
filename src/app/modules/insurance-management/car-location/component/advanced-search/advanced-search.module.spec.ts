/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AdvancedSearchModule } from './advanced-search.module';

describe( 'AdvancedSearchModule', () => {
  let advancedSearchModule;

  beforeEach(() => {
    advancedSearchModule = new AdvancedSearchModule();
  });

  it( 'should create an instance', () => {
    expect( advancedSearchModule ).toBeTruthy();
  });
});
