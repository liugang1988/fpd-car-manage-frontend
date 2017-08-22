/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ProductNumberSelectModule } from './product-number-select.module';

describe( 'ProductNumberSelectModule', () => {
  let productNumberSelectModule;

  beforeEach(() => {
    productNumberSelectModule = new ProductNumberSelectModule();
  });

  it( 'should create an instance', () => {
    expect( productNumberSelectModule ).toBeTruthy();
  });
});
