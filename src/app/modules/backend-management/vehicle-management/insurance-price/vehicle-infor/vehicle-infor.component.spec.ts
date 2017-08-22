import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInforComponent } from './vehicle-infor.component';

describe('VehicleInforComponent', () => {
  let component: VehicleInforComponent;
  let fixture: ComponentFixture<VehicleInforComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleInforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
