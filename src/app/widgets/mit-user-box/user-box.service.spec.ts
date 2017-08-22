/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserBoxService } from './user-box.service';

describe('UserBoxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserBoxService]
    });
  });

  it('should ...', inject([UserBoxService], (service: UserBoxService) => {
    expect(service).toBeTruthy();
  }));
});
