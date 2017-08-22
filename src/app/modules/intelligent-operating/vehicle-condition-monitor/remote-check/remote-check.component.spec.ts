import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteCheckComponent } from './remote-check.component';

describe('RemoteCheckComponent', () => {
  let component: RemoteCheckComponent;
  let fixture: ComponentFixture<RemoteCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
