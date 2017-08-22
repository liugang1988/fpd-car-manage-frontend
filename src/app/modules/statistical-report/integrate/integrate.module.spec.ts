/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { IntegrateModule } from './integrate.module';

describe( 'IntegrateModule', () => {
  let integrateModule;

  beforeEach(() => {
    integrateModule = new IntegrateModule();
  });

  it( 'should create an instance', () => {
    expect( integrateModule ).toBeTruthy();
  });
});
