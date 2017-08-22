/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SystemMessageService } from './system-message.service';

describe('SystemMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemMessageService]
    });
  });

  it('should ...', inject([SystemMessageService], (service: SystemMessageService) => {
    expect(service).toBeTruthy();
  }));
});
