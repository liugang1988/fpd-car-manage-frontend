/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OperateLogComponent } from './operate-log.component';

describe('OperateLogComponent', () => {
  let component: OperateLogComponent;
  let fixture: ComponentFixture<OperateLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperateLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperateLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
