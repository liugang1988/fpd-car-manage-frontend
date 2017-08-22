/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IntelligentOperatingComponent } from './intelligent-operating.component';

describe('IntelligentOperatingComponent', () => {
  let component: IntelligentOperatingComponent;
  let fixture: ComponentFixture<IntelligentOperatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntelligentOperatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntelligentOperatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
