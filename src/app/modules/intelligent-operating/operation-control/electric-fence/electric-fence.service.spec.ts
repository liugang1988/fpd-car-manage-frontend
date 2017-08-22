import { TestBed, inject } from '@angular/core/testing';

import { ElectricFenceService } from './electric-fence.service';

describe('ElectricFenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectricFenceService]
    });
  });

  it('should ...', inject([ElectricFenceService], (service: ElectricFenceService) => {
    expect(service).toBeTruthy();
  }));
});
