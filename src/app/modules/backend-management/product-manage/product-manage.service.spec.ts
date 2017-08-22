/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductManageService } from './product-manage.service';

describe('ProductManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductManageService]
    });
  });

  it('should ...', inject([ProductManageService], (service: ProductManageService) => {
    expect(service).toBeTruthy();
  }));
});
