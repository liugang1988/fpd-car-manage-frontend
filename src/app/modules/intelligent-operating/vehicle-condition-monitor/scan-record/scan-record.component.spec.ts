import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanRecordComponent } from './scan-record.component';

describe('ScanRecordComponent', () => {
  let component: ScanRecordComponent;
  let fixture: ComponentFixture<ScanRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
