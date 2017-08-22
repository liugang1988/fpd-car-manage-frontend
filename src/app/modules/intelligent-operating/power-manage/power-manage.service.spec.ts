/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PowerManageService } from './power-manage.service';

describe('PowerManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PowerManageService]
    });
  });

  it('should ...', inject([PowerManageService], (service: PowerManageService) => {
    expect(service).toBeTruthy();
  }));
});
