/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MitBaiduMapService } from './mit-baidu-map.service';

describe('MitBaiduMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MitBaiduMapService]
    });
  });

  it('should ...', inject([MitBaiduMapService], (service: MitBaiduMapService) => {
    expect(service).toBeTruthy();
  }));
});
