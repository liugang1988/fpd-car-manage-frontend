import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitStarsComponent } from './mit-stars.component';

describe('MitStarsComponent', () => {
  let component: MitStarsComponent;
  let fixture: ComponentFixture<MitStarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitStarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
