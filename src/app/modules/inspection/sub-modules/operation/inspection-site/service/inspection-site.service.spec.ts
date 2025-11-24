/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InspectionSiteService } from './inspection-site.service';

describe('Service: InspectionSite', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectionSiteService]
    });
  });

  it('should ...', inject([InspectionSiteService], (service: InspectionSiteService) => {
    expect(service).toBeTruthy();
  }));
});
