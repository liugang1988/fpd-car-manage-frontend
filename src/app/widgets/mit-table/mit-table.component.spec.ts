/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MitTableComponent } from './mit-table.component';

describe('MitTableComponent', () => {
  let component: MitTableComponent;
  let fixture: ComponentFixture<MitTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
