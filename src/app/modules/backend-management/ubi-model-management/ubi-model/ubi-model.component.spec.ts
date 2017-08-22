import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbiModelComponent } from './ubi-model.component';

describe('UbiModelComponent', () => {
  let component: UbiModelComponent;
  let fixture: ComponentFixture<UbiModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbiModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbiModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
