/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { PlaybackSpeedModule } from './playback-speed.module';

describe( 'PlaybackSpeedModule', () => {
  let playbackSpeedModule;

  beforeEach(() => {
    playbackSpeedModule = new PlaybackSpeedModule();
  });

  it( 'should create an instance', () => {
    expect( playbackSpeedModule ).toBeTruthy();
  });
});
