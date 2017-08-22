/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SpeedFenceModule } from './speed-fence.module';

describe( 'SpeedFenceModule', () => {
  let speedFenceModule;

  beforeEach(() => {
    speedFenceModule = new SpeedFenceModule();
  });

  it( 'should create an instance', () => {
    expect( speedFenceModule ).toBeTruthy();
  });
});
