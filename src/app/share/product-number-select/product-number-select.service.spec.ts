/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductNumberSelectService } from './product-number-select.service';

describe('ProductNumberSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductNumberSelectService]
    });
  });

  it('should ...', inject([ProductNumberSelectService], (service: ProductNumberSelectService) => {
    expect(service).toBeTruthy();
  }));
});
