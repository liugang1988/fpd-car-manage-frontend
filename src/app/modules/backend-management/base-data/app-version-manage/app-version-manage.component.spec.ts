import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppVersionManageComponent } from './app-version-manage.component';

describe('AppVersionManageComponent', () => {
  let component: AppVersionManageComponent;
  let fixture: ComponentFixture<AppVersionManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppVersionManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppVersionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
