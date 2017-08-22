/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MileageModule } from './mileage.module';

describe('MileageModule', () => {
  let mileageModule;

  beforeEach(() => {
    mileageModule = new MileageModule();
  });

  it('should create an instance', () => {
    expect(mileageModule).toBeTruthy();
  });
});
