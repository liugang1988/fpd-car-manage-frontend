/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UpgradeManageService } from './upgrade-manage.service';

describe('UpgradeManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpgradeManageService]
    });
  });

  it('should ...', inject([UpgradeManageService], (service: UpgradeManageService) => {
    expect(service).toBeTruthy();
  }));
});
