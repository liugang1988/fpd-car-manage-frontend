/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SupplierSelectService } from './supplier-select.service';

describe('SupplierSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierSelectService]
    });
  });

  it('should ...', inject([SupplierSelectService], (service: SupplierSelectService) => {
    expect(service).toBeTruthy();
  }));
});
