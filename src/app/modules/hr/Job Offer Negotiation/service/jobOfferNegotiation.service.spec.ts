/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JobOfferNegotiationService } from './jobOfferNegotiation.service';

describe('Service: JobOfferNegotiation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobOfferNegotiationService]
    });
  });

  it('should ...', inject([JobOfferNegotiationService], (service: JobOfferNegotiationService) => {
    expect(service).toBeTruthy();
  }));
});
