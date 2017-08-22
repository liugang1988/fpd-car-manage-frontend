import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineCheckComponent } from './engine-check.component';

describe('EngineCheckComponent', () => {
  let component: EngineCheckComponent;
  let fixture: ComponentFixture<EngineCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
