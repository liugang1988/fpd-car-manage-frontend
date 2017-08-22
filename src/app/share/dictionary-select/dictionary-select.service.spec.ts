/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DictionarySelectService } from './dictionary-select.service';

describe('DictionarySelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DictionarySelectService]
    });
  });

  it('should ...', inject([DictionarySelectService], (service: DictionarySelectService) => {
    expect(service).toBeTruthy();
  }));
});
