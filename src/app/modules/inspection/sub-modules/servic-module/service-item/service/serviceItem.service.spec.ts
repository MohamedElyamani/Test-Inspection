/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServiceItemService } from './serviceItem.service';

describe('Service: ServiceItem', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceItemService]
    });
  });

  it('should ...', inject([ServiceItemService], (service: ServiceItemService) => {
    expect(service).toBeTruthy();
  }));
});
