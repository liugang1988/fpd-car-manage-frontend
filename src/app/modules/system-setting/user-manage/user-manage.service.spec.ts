/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserManageService } from './user-manage.service';

describe('UserManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserManageService]
    });
  });

  it('should ...', inject([UserManageService], (service: UserManageService) => {
    expect(service).toBeTruthy();
  }));
});
