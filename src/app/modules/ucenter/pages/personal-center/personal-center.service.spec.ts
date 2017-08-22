/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PersonalCenterService } from './personal-center.service';

describe('PersonalCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonalCenterService]
    });
  });

  it('should ...', inject([PersonalCenterService], (service: PersonalCenterService) => {
    expect(service).toBeTruthy();
  }));
});
