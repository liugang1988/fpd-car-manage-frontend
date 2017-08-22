import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyYearMonthSelectComponent } from './only-year-month-select.component';

describe('OnlyYearMonthSelectComponent', () => {
  let component: OnlyYearMonthSelectComponent;
  let fixture: ComponentFixture<OnlyYearMonthSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlyYearMonthSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyYearMonthSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
