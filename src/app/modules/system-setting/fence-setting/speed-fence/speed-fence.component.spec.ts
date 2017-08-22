import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedFenceComponent } from './speed-fence.component';

describe('SpeedFenceComponent', () => {
  let component: SpeedFenceComponent;
  let fixture: ComponentFixture<SpeedFenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeedFenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeedFenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
