/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SimManageComponent } from './sim-manage.component';

describe('SimManageComponent', () => {
  let component: SimManageComponent;
  let fixture: ComponentFixture<SimManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
