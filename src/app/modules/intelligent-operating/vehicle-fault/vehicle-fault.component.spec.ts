import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleFaultComponent } from './vehicle-fault.component';

describe('VehicleFaultComponent', () => {
  let component: VehicleFaultComponent;
  let fixture: ComponentFixture<VehicleFaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleFaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleFaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
