/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewCertifService } from './new-certif.service';

describe('Service: NewCertif', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewCertifService]
    });
  });

  it('should ...', inject([NewCertifService], (service: NewCertifService) => {
    expect(service).toBeTruthy();
  }));
});
