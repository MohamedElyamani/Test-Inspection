/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InspectionReqService } from './inspection-req.service';

describe('Service: InspectionReq', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionReqService]
    });
  });

  it('should ...', inject([InspectionReqService], (service: InspectionReqService) => {
    expect(service).toBeTruthy();
  }));
});
