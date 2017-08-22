import { TestBed, inject } from '@angular/core/testing';

import { OperateLogService } from './operate-log.service';

describe('OperateLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperateLogService]
    });
  });

  it('should ...', inject([OperateLogService], (service: OperateLogService) => {
    expect(service).toBeTruthy();
  }));
});
