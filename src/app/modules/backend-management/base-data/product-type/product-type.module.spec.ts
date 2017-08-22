/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ProductTypeModule } from './product-type.module';

describe( 'ProductTypeModule', () => {
  let productTypeModule;

  beforeEach(() => {
    productTypeModule = new ProductTypeModule();
  });

  it( 'should create an instance', () => {
    expect( productTypeModule ).toBeTruthy();
  });
});
