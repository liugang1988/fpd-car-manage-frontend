import { TestBed, inject } from '@angular/core/testing';

import { OrganizationTreeSelectService } from './organization-tree-select.service';

describe('OrganizationTreeSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationTreeSelectService]
    });
  });

  it('should ...', inject([OrganizationTreeSelectService], (service: OrganizationTreeSelectService) => {
    expect(service).toBeTruthy();
  }));
});
