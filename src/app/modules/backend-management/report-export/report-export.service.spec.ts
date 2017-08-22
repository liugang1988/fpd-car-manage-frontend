import { TestBed, inject } from '@angular/core/testing';

import { ReportExportService } from './report-export.service';

describe('ReportExportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportExportService]
    });
  });

  it('should ...', inject([ReportExportService], (service: ReportExportService) => {
    expect(service).toBeTruthy();
  }));
});
