/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JobTitleService } from './jobTitle.service';

describe('Service: JobTitle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobTitleService]
    });
  });

  it('should ...', inject([JobTitleService], (service: JobTitleService) => {
    expect(service).toBeTruthy();
  }));
});
