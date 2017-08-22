/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleSelectService } from './role-select.service';

describe('RoleSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleSelectService]
    });
  });

  it('should ...', inject([RoleSelectService], (service: RoleSelectService) => {
    expect(service).toBeTruthy();
  }));
});
