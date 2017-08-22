/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SoftwareVersionService } from './software-version.service';

describe('SoftwareVersionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoftwareVersionService]
    });
  });

  it('should ...', inject([SoftwareVersionService], (service: SoftwareVersionService) => {
    expect(service).toBeTruthy();
  }));
});
