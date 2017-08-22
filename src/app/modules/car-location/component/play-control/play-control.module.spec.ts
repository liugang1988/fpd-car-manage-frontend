/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { PlayControlModule } from './play-control.module';

describe( 'PlayControlModule', () => {
  let playControlModule;

  beforeEach(() => {
    playControlModule = new PlayControlModule();
  });

  it( 'should create an instance', () => {
    expect( playControlModule ).toBeTruthy();
  });
});
