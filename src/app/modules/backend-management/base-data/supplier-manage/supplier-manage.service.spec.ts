/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SupplierManageService } from './supplier-manage.service';

describe('SupplierManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierManageService]
    });
  });

  it('should ...', inject([SupplierManageService], (service: SupplierManageService) => {
    expect(service).toBeTruthy();
  }));
});
