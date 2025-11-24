/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EquipmenttypeService } from './equipmenttype.service';

describe('Service: Equipmenttype', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipmenttypeService]
    });
  });

  it('should ...', inject([EquipmenttypeService], (service: EquipmenttypeService) => {
    expect(service).toBeTruthy();
  }));
});
