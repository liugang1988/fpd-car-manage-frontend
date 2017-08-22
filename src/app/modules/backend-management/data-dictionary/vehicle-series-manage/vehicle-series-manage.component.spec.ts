import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSeriesManageComponent } from './vehicle-series-manage.component';

describe('VehicleSeriesManageComponent', () => {
  let component: VehicleSeriesManageComponent;
  let fixture: ComponentFixture<VehicleSeriesManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleSeriesManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSeriesManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
