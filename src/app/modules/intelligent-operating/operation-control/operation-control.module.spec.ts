/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { OperationControlModule } from './operation-control.module';

describe( 'OperationControlModule', () => {
  let operationControlModule;

  beforeEach(() => {
    operationControlModule = new OperationControlModule();
  });

  it( 'should create an instance', () => {
    expect( operationControlModule ).toBeTruthy();
  });
});
