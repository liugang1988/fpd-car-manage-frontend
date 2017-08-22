import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessFileComponent } from './access-file.component';

describe('AccessFileComponent', () => {
  let component: AccessFileComponent;
  let fixture: ComponentFixture<AccessFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
