import { TestBed, inject } from '@angular/core/testing';

import { NameOfCarService } from './name-of-car.service';

describe('NameOfCarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NameOfCarService]
    });
  });

  it('should ...', inject([NameOfCarService], (service: NameOfCarService) => {
    expect(service).toBeTruthy();
  }));
});
