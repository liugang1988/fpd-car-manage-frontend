import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitTimePickerComponent } from './mit-time-picker.component';

describe('MitTimePickerComponent', () => {
  let component: MitTimePickerComponent;
  let fixture: ComponentFixture<MitTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
