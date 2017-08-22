/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegionFenceComponent } from './region-fence.component';

describe('RegionFenceComponent', () => {
  let component: RegionFenceComponent;
  let fixture: ComponentFixture<RegionFenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionFenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionFenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
