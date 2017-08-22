/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChaseCarComponent } from './chase-car.component';

describe('ChaseCarComponent', () => {
  let component: ChaseCarComponent;
  let fixture: ComponentFixture<ChaseCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChaseCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaseCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
