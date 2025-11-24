/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InspectorService } from './inspector.service';

describe('Service: Inspector', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectorService]
    });
  });

  it('should ...', inject([InspectorService], (service: InspectorService) => {
    expect(service).toBeTruthy();
  }));
});
