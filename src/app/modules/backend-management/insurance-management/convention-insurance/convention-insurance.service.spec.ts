import { TestBed, inject } from '@angular/core/testing';

import { ConventionInsuranceService } from './convention-insurance.service';

describe('ConventionInsuranceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConventionInsuranceService]
    });
  });

  it('should ...', inject([ConventionInsuranceService], (service: ConventionInsuranceService) => {
    expect(service).toBeTruthy();
  }));
});
