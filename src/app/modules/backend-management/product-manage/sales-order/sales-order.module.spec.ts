/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SalesOrderModule } from './sales-order.module';

describe( 'SalesOrderModule', () => {
  let salesOrderModule;

  beforeEach(() => {
    salesOrderModule = new SalesOrderModule();
  });

  it( 'should create an instance', () => {
    expect( salesOrderModule ).toBeTruthy();
  });
});
