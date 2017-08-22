/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReturnManageService } from './return-manage.service';

describe('ReturnManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReturnManageService]
    });
  });

  it('should ...', inject([ReturnManageService], (service: ReturnManageService) => {
    expect(service).toBeTruthy();
  }));
});
