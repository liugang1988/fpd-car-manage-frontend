/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HistoryTrackService } from './history-track.service';

describe('HistoryTrackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryTrackService]
    });
  });

  it('should ...', inject([HistoryTrackService], (service: HistoryTrackService) => {
    expect(service).toBeTruthy();
  }));
});
