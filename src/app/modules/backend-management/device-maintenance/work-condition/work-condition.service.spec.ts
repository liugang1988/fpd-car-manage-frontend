/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkConditionService } from './work-condition.service';

describe('WorkConditionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkConditionService]
    });
  });

  it('should ...', inject([WorkConditionService], (service: WorkConditionService) => {
    expect(service).toBeTruthy();
  }));
});
