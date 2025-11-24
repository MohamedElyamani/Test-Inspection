/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppCVService } from './appCV.service';

describe('Service: AppCV', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppCVService]
    });
  });

  it('should ...', inject([AppCVService], (service: AppCVService) => {
    expect(service).toBeTruthy();
  }));
});
