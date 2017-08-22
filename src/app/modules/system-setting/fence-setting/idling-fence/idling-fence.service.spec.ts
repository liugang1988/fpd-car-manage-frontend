import { TestBed, inject } from '@angular/core/testing';

import { IdlingFenceService } from './idling-fence.service';

describe('IdlingFenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdlingFenceService]
    });
  });

  it('should ...', inject([IdlingFenceService], (service: IdlingFenceService) => {
    expect(service).toBeTruthy();
  }));
});
