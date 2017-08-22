/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SalesOrderService } from './sales-order.service';

describe('SalesOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesOrderService]
    });
  });

  it('should ...', inject([SalesOrderService], (service: SalesOrderService) => {
    expect(service).toBeTruthy();
  }));
});
