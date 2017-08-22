import { TestBed, inject } from '@angular/core/testing';

import { EventSetService } from './event-set.service';

describe('EventSetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventSetService]
    });
  });

  it('should ...', inject([EventSetService], (service: EventSetService) => {
    expect(service).toBeTruthy();
  }));
});
