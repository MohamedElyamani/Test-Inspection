/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InspectionScheService } from './inspection-sche.service';

describe('Service: InspectionSche', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionScheService]
    });
  });

  it('should ...', inject([InspectionScheService], (service: InspectionScheService) => {
    expect(service).toBeTruthy();
  }));
});
