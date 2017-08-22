/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SupplierSelectModule } from './supplier-select.module';

describe('SupplierSelectModule', () => {
  let supplierSelectModule;

  beforeEach(() => {
    supplierSelectModule = new SupplierSelectModule();
  });

  it('should create an instance', () => {
    expect(supplierSelectModule).toBeTruthy();
  });
});
