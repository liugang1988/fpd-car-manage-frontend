import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbiHistoryInsuranceComponent } from './ubi-history-insurance.component';

describe('UbiHistoryInsuranceComponent', () => {
  let component: UbiHistoryInsuranceComponent;
  let fixture: ComponentFixture<UbiHistoryInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbiHistoryInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbiHistoryInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
