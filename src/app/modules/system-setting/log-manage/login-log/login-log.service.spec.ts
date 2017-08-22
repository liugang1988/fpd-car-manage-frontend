import { TestBed, inject } from '@angular/core/testing';

import { LoginLogService } from './login-log.service';

describe('LoginLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginLogService]
    });
  });

  it('should ...', inject([LoginLogService], (service: LoginLogService) => {
    expect(service).toBeTruthy();
  }));
});
