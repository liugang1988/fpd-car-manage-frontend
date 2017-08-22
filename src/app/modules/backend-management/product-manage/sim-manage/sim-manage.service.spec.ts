/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SimManageService } from './sim-manage.service';

describe('SimManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimManageService]
    });
  });

  it('should ...', inject([SimManageService], (service: SimManageService) => {
    expect(service).toBeTruthy();
  }));
});
