import { TestBed, inject } from '@angular/core/testing';

import { OperationManagementService } from './operation-management.service';

describe('OperationManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperationManagementService]
    });
  });

  it('should ...', inject([OperationManagementService], (service: OperationManagementService) => {
    expect(service).toBeTruthy();
  }));
});
