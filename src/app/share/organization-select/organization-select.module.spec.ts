/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { OrganizationSelectModule } from './organization-select.module';

describe('OrganizationSelectModule', () => {
  let organizationSelectModule;

  beforeEach(() => {
    organizationSelectModule = new OrganizationSelectModule();
  });

  it('should create an instance', () => {
    expect(organizationSelectModule).toBeTruthy();
  });
});
