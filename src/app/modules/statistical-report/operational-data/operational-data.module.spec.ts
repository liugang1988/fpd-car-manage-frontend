/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { OperationalDataModule } from './operational-data.module';

describe( 'OperationalDataModule', () => {
  let operationalDataModule;

  beforeEach(() => {
    operationalDataModule = new OperationalDataModule();
  });

  it( 'should create an instance', () => {
    expect( operationalDataModule ).toBeTruthy();
  });
});
