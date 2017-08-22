import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionInsuranceComponent } from './convention-insurance.component';

describe('ConventionInsuranceComponent', () => {
  let component: ConventionInsuranceComponent;
  let fixture: ComponentFixture<ConventionInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConventionInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConventionInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
