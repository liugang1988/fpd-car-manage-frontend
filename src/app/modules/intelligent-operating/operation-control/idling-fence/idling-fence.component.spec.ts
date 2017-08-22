/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IdlingFenceComponent } from './idling-fence.component';

describe('IdlingFenceComponent', () => {
  let component: IdlingFenceComponent;
  let fixture: ComponentFixture<IdlingFenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdlingFenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdlingFenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
