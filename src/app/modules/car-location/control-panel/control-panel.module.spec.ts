/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import {ControlPanelModule} from './control-panel.module';

describe('ControlPanelModule', () => {
  let controlPanelModule;

  beforeEach(() => {
    controlPanelModule = new ControlPanelModule();
  });

  it('should create an instance', () => {
    expect(controlPanelModule).toBeTruthy();
  });
});
