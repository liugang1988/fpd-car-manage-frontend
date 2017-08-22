/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PuchaseOrderService } from './puchase-order.service';

describe('PuchaseOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PuchaseOrderService]
    });
  });

  it('should ...', inject([PuchaseOrderService], (service: PuchaseOrderService) => {
    expect(service).toBeTruthy();
  }));
});
