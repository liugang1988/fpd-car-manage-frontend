import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeManagementComponent } from './guarantee-management.component';

describe('GuaranteeManagementComponent', () => {
  let component: GuaranteeManagementComponent;
  let fixture: ComponentFixture<GuaranteeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
