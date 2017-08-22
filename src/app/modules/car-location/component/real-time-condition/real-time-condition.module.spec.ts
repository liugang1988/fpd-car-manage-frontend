/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import RealTimeConditionModule from './real-time-condition.module';

describe('RealTimeConditionModule', () => {
  let realTimeConditionModule;

  beforeEach(() => {
    realTimeConditionModule = new RealTimeConditionModule();
  });

  it('should create an instance', () => {
    expect(realTimeConditionModule).toBeTruthy();
  });
});
