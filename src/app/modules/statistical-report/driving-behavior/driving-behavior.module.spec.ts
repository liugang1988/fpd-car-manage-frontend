/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DrivingBehaviorModule } from './driving-behavior.module';

describe('DrivingBehaviorModule', () => {
  let drivingBehaviorModule;

  beforeEach(() => {
    drivingBehaviorModule = new DrivingBehaviorModule();
  });

  it('should create an instance', () => {
    expect(drivingBehaviorModule).toBeTruthy();
  });
});
