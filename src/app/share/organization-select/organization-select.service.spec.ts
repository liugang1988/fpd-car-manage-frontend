/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrganizationSelectService } from './organization-select.service';

describe('OrganizationSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationSelectService]
    });
  });

  it('should ...', inject([OrganizationSelectService], (service: OrganizationSelectService) => {
    expect(service).toBeTruthy();
  }));
});
