import { TestBed, inject } from '@angular/core/testing';

import { RegionFenceService } from './region-fence.service';

describe('RegionFenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegionFenceService]
    });
  });

  it('should ...', inject([RegionFenceService], (service: RegionFenceService) => {
    expect(service).toBeTruthy();
  }));
});
