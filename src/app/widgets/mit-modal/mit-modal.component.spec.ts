import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitModalComponent } from './mit-modal.component';

describe('MitModalComponent', () => {
  let component: MitModalComponent;
  let fixture: ComponentFixture<MitModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
