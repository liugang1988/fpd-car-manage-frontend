/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecurityAlertService } from './security-alert.service';

describe('SecurityAlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityAlertService]
    });
  });

  it('should ...', inject([SecurityAlertService], (service: SecurityAlertService) => {
    expect(service).toBeTruthy();
  }));
});
