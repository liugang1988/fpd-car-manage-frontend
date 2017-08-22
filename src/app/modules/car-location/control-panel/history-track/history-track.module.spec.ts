/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { HistoryTrackModule } from './history-track.module';

describe( 'HistoryTrackModule', () => {
  let historyTrackModule;

  beforeEach(() => {
    historyTrackModule = new HistoryTrackModule();
  });

  it( 'should create an instance', () => {
    expect( historyTrackModule ).toBeTruthy();
  });
});
