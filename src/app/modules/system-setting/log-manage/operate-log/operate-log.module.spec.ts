/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { OperateLogModule } from './operate-log.module';

describe( 'OperateLogModule', () => {
  let operateLogModule;

  beforeEach(() => {
    operateLogModule = new OperateLogModule();
  });

  it( 'should create an instance', () => {
    expect( operateLogModule ).toBeTruthy();
  });
});
