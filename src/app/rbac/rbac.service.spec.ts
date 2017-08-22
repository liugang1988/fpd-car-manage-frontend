/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RbacService } from './rbac.service';

describe('RbacService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RbacService]
    });
  });

  it('should ...', inject([RbacService], (service: RbacService) => {
    expect(service).toBeTruthy();
  }));
});
