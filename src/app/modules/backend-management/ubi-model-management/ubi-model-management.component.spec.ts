import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbiModelManagementComponent } from './ubi-model-management.component';

describe('UbiModelManagementComponent', () => {
  let component: UbiModelManagementComponent;
  let fixture: ComponentFixture<UbiModelManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbiModelManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbiModelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
