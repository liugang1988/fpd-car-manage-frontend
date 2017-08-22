/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleSelectService } from './vehicle-select.service';

describe('VehicleSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleSelectService]
    });
  });

  it('should ...', inject([VehicleSelectService], (service: VehicleSelectService) => {
    expect(service).toBeTruthy();
  }));
});
