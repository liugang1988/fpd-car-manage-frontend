import { TestBed, inject } from '@angular/core/testing';

import { SpeedFenceService } from './speed-fence.service';

describe('SpeedFenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeedFenceService]
    });
  });

  it('should ...', inject([SpeedFenceService], (service: SpeedFenceService) => {
    expect(service).toBeTruthy();
  }));
});
