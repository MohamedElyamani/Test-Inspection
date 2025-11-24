/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InspectorCategoryService } from './inspector-category.service';

describe('Service: InspectorCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspectorCategoryService]
    });
  });

  it('should ...', inject([InspectorCategoryService], (service: InspectorCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
