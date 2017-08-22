import { TestBed, inject } from '@angular/core/testing';

import { InsuranceProjectService } from './insurance-project.service';

describe('InsuranceProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsuranceProjectService]
    });
  });

  it('should ...', inject([InsuranceProjectService], (service: InsuranceProjectService) => {
    expect(service).toBeTruthy();
  }));
});
