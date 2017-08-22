import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHandingComponent } from './event-handing.component';

describe('EventHandingComponent', () => {
  let component: EventHandingComponent;
  let fixture: ComponentFixture<EventHandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventHandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventHandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
