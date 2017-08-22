/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { IdlingFenceModule } from './idling-fence.module';

describe( 'IdlingFenceModule', () => {
  let idlingFenceModule;

  beforeEach(() => {
    idlingFenceModule = new IdlingFenceModule();
  });

  it( 'should create an instance', () => {
    expect( idlingFenceModule ).toBeTruthy();
  });
});
