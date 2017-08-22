/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HomeOverviewService } from './home-overview.service';

describe('HomeOverviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeOverviewService]
    });
  });

  it('should ...', inject([HomeOverviewService], (service: HomeOverviewService) => {
    expect(service).toBeTruthy();
  }));
});
