import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSetComponent } from './event-set.component';

describe('EventSetComponent', () => {
  let component: EventSetComponent;
  let fixture: ComponentFixture<EventSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
