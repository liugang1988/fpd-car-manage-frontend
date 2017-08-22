import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUbiInsuranceComponent } from './create-ubi-insurance.component';

describe('CreateUbiInsuranceComponent', () => {
  let component: CreateUbiInsuranceComponent;
  let fixture: ComponentFixture<CreateUbiInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUbiInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUbiInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
