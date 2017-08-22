import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertRecordEnumCheckboxComponent } from './alert-record-enum-checkbox.component';

describe('AlertRecordEnumCheckboxComponent', () => {
  let component: AlertRecordEnumCheckboxComponent;
  let fixture: ComponentFixture<AlertRecordEnumCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertRecordEnumCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertRecordEnumCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
