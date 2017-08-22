import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRankComponent } from './driver-rank.component';

describe('DriverRankComponent', () => {
  let component: DriverRankComponent;
  let fixture: ComponentFixture<DriverRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
