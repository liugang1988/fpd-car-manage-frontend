/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UcenterComponent } from './ucenter.component';

describe('UcenterComponent', () => {
  let component: UcenterComponent;
  let fixture: ComponentFixture<UcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
