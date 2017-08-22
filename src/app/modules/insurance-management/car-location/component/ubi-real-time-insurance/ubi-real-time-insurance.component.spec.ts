import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbiRealTimeInsuranceComponent } from './ubi-real-time-insurance.component';

describe('UbiRealTimeInsuranceComponent', () => {
  let component: UbiRealTimeInsuranceComponent;
  let fixture: ComponentFixture<UbiRealTimeInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbiRealTimeInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbiRealTimeInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
