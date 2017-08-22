import { TestBed, inject } from '@angular/core/testing';

import { FatigueService } from './fatigue.service';

describe('FatigueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FatigueService]
    });
  });

  it('should ...', inject([FatigueService], (service: FatigueService) => {
    expect(service).toBeTruthy();
  }));
});
