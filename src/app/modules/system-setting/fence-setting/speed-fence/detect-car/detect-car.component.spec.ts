import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectCarComponent } from './detect-car.component';

describe('DetectCarComponent', () => {
  let component: DetectCarComponent;
  let fixture: ComponentFixture<DetectCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
