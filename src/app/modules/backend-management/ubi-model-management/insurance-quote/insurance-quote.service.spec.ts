import { TestBed, inject } from '@angular/core/testing';

import { InsuranceQuoteService } from './insurance-quote.service';

describe('InsuranceQuoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsuranceQuoteService]
    });
  });

  it('should ...', inject([InsuranceQuoteService], (service: InsuranceQuoteService) => {
    expect(service).toBeTruthy();
  }));
});
