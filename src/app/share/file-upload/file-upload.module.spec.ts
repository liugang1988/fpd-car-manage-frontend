/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FileUploadModule } from './file-upload.module';

describe( 'FileUploadModule', () => {
  let fileUploadModule;

  beforeEach(() => {
    fileUploadModule = new FileUploadModule();
  });

  it( 'should create an instance', () => {
    expect( fileUploadModule ).toBeTruthy();
  });
});
