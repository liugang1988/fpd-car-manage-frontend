import { TestBed, inject } from '@angular/core/testing';
import { FuelConsumptionService } from './fuel-consumption.service';

describe('FuelConsumptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuelConsumptionService]
    });
  });

  it('should ...', inject([FuelConsumptionService], (service: FuelConsumptionService) => {
    expect(service).toBeTruthy();
  }));
});
