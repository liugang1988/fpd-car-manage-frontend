/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MitDataTableService } from './mit-data-table.service';

describe('MitDataTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MitDataTableService]
    });
  });

  it('should ...', inject([MitDataTableService], (service: MitDataTableService) => {
    expect(service).toBeTruthy();
  }));
});
