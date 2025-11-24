/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerSetubService } from './customerSetub.service';

describe('Service: CustomerSetub', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerSetubService]
    });
  });

  it('should ...', inject([CustomerSetubService], (service: CustomerSetubService) => {
    expect(service).toBeTruthy();
  }));
});
