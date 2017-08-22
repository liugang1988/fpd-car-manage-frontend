/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FatigueModule } from './fatigue.module';

describe( 'FatigueModule', () => {
  let fatigueModule;

  beforeEach(() => {
    fatigueModule = new FatigueModule();
  });

  it( 'should create an instance', () => {
    expect( fatigueModule ).toBeTruthy();
  });
});
