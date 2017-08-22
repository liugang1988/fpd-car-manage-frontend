/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MitAddressSelectService } from './mit-address-select.service';

describe('MitAddressSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MitAddressSelectService]
    });
  });

  it('should ...', inject([MitAddressSelectService], (service: MitAddressSelectService) => {
    expect(service).toBeTruthy();
  }));
});
