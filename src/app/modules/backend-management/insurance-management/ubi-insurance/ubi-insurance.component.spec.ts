import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbiInsuranceComponent } from './ubi-insurance.component';

describe('UbiInsuranceComponent', () => {
  let component: UbiInsuranceComponent;
  let fixture: ComponentFixture<UbiInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbiInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbiInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
