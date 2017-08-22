/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UnbindComponent } from './unbind.component';

describe('UnbindComponent', () => {
  let component: UnbindComponent;
  let fixture: ComponentFixture<UnbindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnbindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnbindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
