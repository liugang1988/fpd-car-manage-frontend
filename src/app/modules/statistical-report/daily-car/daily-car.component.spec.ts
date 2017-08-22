import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCarComponent } from './daily-car.component';

describe('DailyCarComponent', () => {
  let component: DailyCarComponent;
  let fixture: ComponentFixture<DailyCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DailyCarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
