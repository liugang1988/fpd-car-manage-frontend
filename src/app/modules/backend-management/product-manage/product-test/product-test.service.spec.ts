/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductTestService } from './product-test.service';

describe('ProductTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductTestService]
    });
  });

  it('should ...', inject([ProductTestService], (service: ProductTestService) => {
    expect(service).toBeTruthy();
  }));
});
