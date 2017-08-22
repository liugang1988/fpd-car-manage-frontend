import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTreeSelectComponent } from './organization-tree-select.component';

describe('OrganizationTreeSelectComponent', () => {
  let component: OrganizationTreeSelectComponent;
  let fixture: ComponentFixture<OrganizationTreeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationTreeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
