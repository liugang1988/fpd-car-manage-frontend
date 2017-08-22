import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbiDetailComponent } from './ubi-detail.component';

describe('UbiDetailComponent', () => {
  let component: UbiDetailComponent;
  let fixture: ComponentFixture<UbiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
