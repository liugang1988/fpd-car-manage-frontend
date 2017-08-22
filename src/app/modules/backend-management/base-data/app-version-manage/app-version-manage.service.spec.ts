import { TestBed, inject } from '@angular/core/testing';

import { AppVersionManageService } from './app-version-manage.service';

describe('AppVersionManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppVersionManageService]
    });
  });

  it('should ...', inject([AppVersionManageService], (service: AppVersionManageService) => {
    expect(service).toBeTruthy();
  }));
});
