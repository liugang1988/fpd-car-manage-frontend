import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceResultComponent } from './price-result.component';

describe('PriceResultComponent', () => {
  let component: PriceResultComponent;
  let fixture: ComponentFixture<PriceResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
