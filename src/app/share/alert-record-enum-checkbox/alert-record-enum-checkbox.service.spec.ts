import { TestBed, inject } from '@angular/core/testing';
import { AlertRecordEnumCheckboxService } from './alert-record-enum-checkbox.service';

describe('AlertRecordEnumCheckboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertRecordEnumCheckboxService]
    });
  });

  it('should ...', inject([AlertRecordEnumCheckboxService], (service: AlertRecordEnumCheckboxService) => {
    expect(service).toBeTruthy();
  }));
});
