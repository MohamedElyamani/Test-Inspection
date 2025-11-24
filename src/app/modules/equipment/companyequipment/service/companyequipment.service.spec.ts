/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompanyequipmentService } from './companyequipment.service';

describe('Service: Companyequipment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyequipmentService]
    });
  });

  it('should ...', inject([CompanyequipmentService], (service: CompanyequipmentService) => {
    expect(service).toBeTruthy();
  }));
});
