/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NameOfCarComponent } from './name-of-car.component';

describe('NameOfCarComponent', () => {
  let component: NameOfCarComponent;
  let fixture: ComponentFixture<NameOfCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameOfCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameOfCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
