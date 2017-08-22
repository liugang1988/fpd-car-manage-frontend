/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ChaseCarModule } from './chase-car.module';

describe( 'ChaseCarModule', () => {
  let chaseCarModule;

  beforeEach(() => {
    chaseCarModule = new ChaseCarModule();
  });

  it( 'should create an instance', () => {
    expect( chaseCarModule ).toBeTruthy();
  });
});
