import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleStyleManageComponent } from './vehicle-style-manage.component';

describe('VehicleStyleManageComponent', () => {
  let component: VehicleStyleManageComponent;
  let fixture: ComponentFixture<VehicleStyleManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleStyleManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleStyleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
