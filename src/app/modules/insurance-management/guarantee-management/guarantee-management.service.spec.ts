import { TestBed, inject } from '@angular/core/testing';

import { GuaranteeManagementService } from './guarantee-management.service';

describe('GuaranteeManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuaranteeManagementService]
    });
  });

  it('should ...', inject([GuaranteeManagementService], (service: GuaranteeManagementService) => {
    expect(service).toBeTruthy();
  }));
});
