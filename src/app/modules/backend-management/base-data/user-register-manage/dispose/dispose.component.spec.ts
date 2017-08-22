import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposeComponent } from './dispose.component';

describe('DisposeComponent', () => {
  let component: DisposeComponent;
  let fixture: ComponentFixture<DisposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
