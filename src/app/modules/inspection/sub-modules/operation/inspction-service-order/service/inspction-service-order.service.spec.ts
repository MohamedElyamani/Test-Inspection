/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InspctionServiceOrderService } from './inspction-service-order.service';

describe('Service: InspctionServiceOrder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspctionServiceOrderService]
    });
  });

  it('should ...', inject([InspctionServiceOrderService], (service: InspctionServiceOrderService) => {
    expect(service).toBeTruthy();
  }));
});
