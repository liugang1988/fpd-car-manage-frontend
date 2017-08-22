/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParamSettingService } from './param-setting.service';

describe('ParamSettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParamSettingService]
    });
  });

  it('should ...', inject([ParamSettingService], (service: ParamSettingService) => {
    expect(service).toBeTruthy();
  }));
});
