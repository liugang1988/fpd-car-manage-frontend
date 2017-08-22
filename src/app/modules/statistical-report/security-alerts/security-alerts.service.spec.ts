import { TestBed, inject } from '@angular/core/testing';

import { SecurityAlertsService } from './security-alerts.service';

describe('SecurityAlertsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityAlertsService]
    });
  });

  it('should ...', inject([SecurityAlertsService], (service: SecurityAlertsService) => {
    expect(service).toBeTruthy();
  }));
});
