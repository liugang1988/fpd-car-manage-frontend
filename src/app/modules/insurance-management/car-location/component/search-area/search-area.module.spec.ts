/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SearchAreaModule } from './search-area.module';

describe( 'SearchAreaModule', () => {
  let searchAreaModule;

  beforeEach(() => {
    searchAreaModule = new SearchAreaModule();
  });

  it( 'should create an instance', () => {
    expect( searchAreaModule ).toBeTruthy();
  });
});
