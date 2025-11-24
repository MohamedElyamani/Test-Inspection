/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SalesQuotationService } from './salesQuotation.service';

describe('Service: SalesQuotation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalesQuotationService]
    });
  });

  it('should ...', inject([SalesQuotationService], (service: SalesQuotationService) => {
    expect(service).toBeTruthy();
  }));
});
