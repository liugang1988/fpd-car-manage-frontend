import { TestBed, inject } from '@angular/core/testing';

import { UbiInsuranceService } from './ubi-insurance.service';

describe('UbiInsuranceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UbiInsuranceService]
    });
  });

  it('should ...', inject([UbiInsuranceService], (service: UbiInsuranceService) => {
    expect(service).toBeTruthy();
  }));
});
