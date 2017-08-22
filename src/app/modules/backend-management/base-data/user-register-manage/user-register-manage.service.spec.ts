/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserRegisterManageService } from './user-register-manage.service';

describe('UserRegisterManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRegisterManageService]
    });
  });

  it('should ...', inject([UserRegisterManageService], (service: UserRegisterManageService) => {
    expect(service).toBeTruthy();
  }));
});
