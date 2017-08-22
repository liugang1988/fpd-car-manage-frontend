/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RegionFenceModule } from './region-fence.module';

describe( 'RegionFenceModule', () => {
  let regionFenceModule;

  beforeEach(() => {
    regionFenceModule = new RegionFenceModule();
  });

  it( 'should create an instance', () => {
    expect( regionFenceModule ).toBeTruthy();
  });
});
