/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PeopleCarBindingService } from './people-car-binding.service';

describe('PeopleCarBindingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeopleCarBindingService]
    });
  });

  it('should ...', inject([PeopleCarBindingService], (service: PeopleCarBindingService) => {
    expect(service).toBeTruthy();
  }));
});
