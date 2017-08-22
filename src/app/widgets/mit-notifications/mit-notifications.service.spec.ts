/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MitNotificationsService } from './mit-notifications.service';

describe('MitNotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MitNotificationsService]
    });
  });

  it('should ...', inject([MitNotificationsService], (service: MitNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
