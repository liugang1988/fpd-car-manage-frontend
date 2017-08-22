import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePriceComponent } from './insurance-price.component';

describe('InsurancePriceComponent', () => {
  let component: InsurancePriceComponent;
  let fixture: ComponentFixture<InsurancePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
