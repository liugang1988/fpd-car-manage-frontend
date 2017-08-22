/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChaseCarService } from './chase-car.service';

describe('ChaseCarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChaseCarService]
    });
  });

  it('should ...', inject([ChaseCarService], (service: ChaseCarService) => {
    expect(service).toBeTruthy();
  }));
});
