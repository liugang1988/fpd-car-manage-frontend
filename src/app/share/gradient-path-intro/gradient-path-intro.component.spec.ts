import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientPathIntroComponent } from './gradient-path-intro.component';

describe('GradientPathIntroComponent', () => {
  let component: GradientPathIntroComponent;
  let fixture: ComponentFixture<GradientPathIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradientPathIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradientPathIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
