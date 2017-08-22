import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbiListComponent } from './ubi-list.component';

describe('UbiListComponent', () => {
  let component: UbiListComponent;
  let fixture: ComponentFixture<UbiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
