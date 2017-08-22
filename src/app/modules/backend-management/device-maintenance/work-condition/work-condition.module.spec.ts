/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { WorkConditionModule } from './work-condition.module';

describe( 'WorkConditionModule', () => {
  let workConditionModule;

  beforeEach(() => {
    workConditionModule = new WorkConditionModule();
  });

  it( 'should create an instance', () => {
    expect( workConditionModule ).toBeTruthy();
  });
});
