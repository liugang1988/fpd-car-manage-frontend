/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PowerManageComponent } from './power-manage.component';

describe('PowerManageComponent', () => {
  let component: PowerManageComponent;
  let fixture: ComponentFixture<PowerManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
