/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeviceLibraryService } from './device-library.service';

describe('DeviceLibraryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceLibraryService]
    });
  });

  it('should ...', inject([DeviceLibraryService], (service: DeviceLibraryService) => {
    expect(service).toBeTruthy();
  }));
});
