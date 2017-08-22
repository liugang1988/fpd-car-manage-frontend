import { TestBed, inject } from '@angular/core/testing';

import { InsuranceReportService } from './insurance-report.service';

describe('InsuranceReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsuranceReportService]
    });
  });

  it('should ...', inject([InsuranceReportService], (service: InsuranceReportService) => {
    expect(service).toBeTruthy();
  }));
});
