import { TestBed, inject } from '@angular/core/testing';

import { InsurancePriceService } from './insurance-price.service';

describe('InsurancePriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsurancePriceService]
    });
  });

  it('should ...', inject([InsurancePriceService], (service: InsurancePriceService) => {
    expect(service).toBeTruthy();
  }));
});
