import { TestBed, inject } from '@angular/core/testing';
import { IntegrateService } from './integrate.service';

describe('IntegrateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntegrateService]
    });
  });

  it('should ...', inject([IntegrateService], (service: IntegrateService) => {
    expect(service).toBeTruthy();
  }));
});
