/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FatigueDrivingComponent } from './fatigue-driving.component';

describe('FatigueDrivingComponent', () => {
  let component: FatigueDrivingComponent;
  let fixture: ComponentFixture<FatigueDrivingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FatigueDrivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FatigueDrivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
