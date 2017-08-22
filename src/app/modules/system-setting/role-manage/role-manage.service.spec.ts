/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleManageService } from './role-manage.service';

describe('RoleManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleManageService]
    });
  });

  it('should ...', inject([RoleManageService], (service: RoleManageService) => {
    expect(service).toBeTruthy();
  }));
});
