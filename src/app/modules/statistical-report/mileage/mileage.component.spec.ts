/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MileageComponent } from './mileage.component';

describe('MileageComponent', () => {
  let component: MileageComponent;
  let fixture: ComponentFixture<MileageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MileageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
