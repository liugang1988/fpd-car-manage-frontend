/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DepartmentSelectService } from './department-select.service';

describe('DepartmentSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartmentSelectService]
    });
  });

  it('should ...', inject([DepartmentSelectService], (service: DepartmentSelectService) => {
    expect(service).toBeTruthy();
  }));
});
