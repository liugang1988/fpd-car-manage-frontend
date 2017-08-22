import { TestBed, inject } from '@angular/core/testing';
import { MileageService } from './mileage.service';

describe('MileageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MileageService]
    });
  });

  it('should ...', inject([MileageService], (service: MileageService) => {
    expect(service).toBeTruthy();
  }));
});
