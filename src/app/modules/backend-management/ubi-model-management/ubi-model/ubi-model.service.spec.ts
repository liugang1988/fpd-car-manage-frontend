import { TestBed, inject } from '@angular/core/testing';

import { UbiModelService } from './ubi-model.service';

describe('UbiModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UbiModelService]
    });
  });

  it('should ...', inject([UbiModelService], (service: UbiModelService) => {
    expect(service).toBeTruthy();
  }));
});
