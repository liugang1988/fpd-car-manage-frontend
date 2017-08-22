import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitLightboxComponent } from './mit-lightbox.component';

describe('MitLightboxComponent', () => {
  let component: MitLightboxComponent;
  let fixture: ComponentFixture<MitLightboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitLightboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
