import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleOffLineComponent } from './vehicle-off-line.component';

describe('VehicleOffLineComponent', () => {
  let component: VehicleOffLineComponent;
  let fixture: ComponentFixture<VehicleOffLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleOffLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleOffLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
