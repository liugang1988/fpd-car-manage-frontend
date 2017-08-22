import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceProjectComponent } from './insurance-project.component';

describe('InsuranceProjectComponent', () => {
  let component: InsuranceProjectComponent;
  let fixture: ComponentFixture<InsuranceProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
