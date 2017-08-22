/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MitImageUploadService } from './mit-image-upload.service';

describe('MitImageUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MitImageUploadService]
    });
  });

  it('should ...', inject([MitImageUploadService], (service: MitImageUploadService) => {
    expect(service).toBeTruthy();
  }));
});
