/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JobOrderService } from './jobOrder.service';

describe('Service: JobOrder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobOrderService]
    });
  });

  it('should ...', inject([JobOrderService], (service: JobOrderService) => {
    expect(service).toBeTruthy();
  }));
});
