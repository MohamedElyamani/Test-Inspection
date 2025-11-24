/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InspectionMethodService } from './inspection-method.service';

describe('Service: InspectionMethod', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionMethodService]
    });
  });

  it('should ...', inject([InspectionMethodService], (service: InspectionMethodService) => {
    expect(service).toBeTruthy();
  }));
});
