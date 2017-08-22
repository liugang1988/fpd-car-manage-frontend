import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityAlertsComponent } from './security-alerts.component';

describe('SecurityAlertsComponent', () => {
  let component: SecurityAlertsComponent;
  let fixture: ComponentFixture<SecurityAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
