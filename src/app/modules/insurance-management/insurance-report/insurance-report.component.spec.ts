import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceReportComponent } from './insurance-report.component';

describe('InsuranceReportComponent', () => {
  let component: InsuranceReportComponent;
  let fixture: ComponentFixture<InsuranceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
