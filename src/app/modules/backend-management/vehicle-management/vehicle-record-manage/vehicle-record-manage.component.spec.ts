import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRecordManageComponent } from './vehicle-record-manage.component';

describe('VehicleRecordManageComponent', () => {
  let component: VehicleRecordManageComponent;
  let fixture: ComponentFixture<VehicleRecordManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleRecordManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRecordManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
