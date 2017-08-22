/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MitPipeComponent } from './mit-pipe.component';

describe('MitPipeComponent', () => {
  let component: MitPipeComponent;
  let fixture: ComponentFixture<MitPipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitPipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
