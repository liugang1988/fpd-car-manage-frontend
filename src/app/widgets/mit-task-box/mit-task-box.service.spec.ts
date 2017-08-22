import { TestBed, inject } from '@angular/core/testing';

import { MitTaskBoxService } from './mit-task-box.service';

describe('MitTaskBoxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MitTaskBoxService]
    });
  });

  it('should ...', inject([MitTaskBoxService], (service: MitTaskBoxService) => {
    expect(service).toBeTruthy();
  }));
});
