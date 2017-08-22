/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ProductNumberModule } from './product-number.module';

describe( 'ProductNumberModule', () => {
  let productNumberModule;

  beforeEach(() => {
    productNumberModule = new ProductNumberModule();
  });

  it( 'should create an instance', () => {
    expect( productNumberModule ).toBeTruthy();
  });
});
