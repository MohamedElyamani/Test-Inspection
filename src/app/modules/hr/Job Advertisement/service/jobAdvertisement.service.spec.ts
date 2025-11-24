/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JobAdvertisementService } from './jobAdvertisement.service';

describe('Service: JobAdvertisement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobAdvertisementService]
    });
  });

  it('should ...', inject([JobAdvertisementService], (service: JobAdvertisementService) => {
    expect(service).toBeTruthy();
  }));
});
