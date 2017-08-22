import { TestBed, inject } from '@angular/core/testing';
import { OperationalDataService } from './operational-data.service';

describe('OperationalDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperationalDataService]
    });
  });

  it('should ...', inject([OperationalDataService], (service: OperationalDataService) => {
    expect(service).toBeTruthy();
  }));
});
