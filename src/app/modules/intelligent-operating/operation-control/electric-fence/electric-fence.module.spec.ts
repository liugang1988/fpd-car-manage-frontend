/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ElectricFenceModule } from './electric-fence.module';

describe( 'ElectricFenceModule', () => {
  let electricFenceModule;

  beforeEach(() => {
    electricFenceModule = new ElectricFenceModule();
  });

  it( 'should create an instance', () => {
    expect( electricFenceModule ).toBeTruthy();
  });
});
