/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrainingSessionAttendanceService } from './trainingSessionAttendance.service';

describe('Service: TrainingSessionAttendance', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingSessionAttendanceService]
    });
  });

  it('should ...', inject([TrainingSessionAttendanceService], (service: TrainingSessionAttendanceService) => {
    expect(service).toBeTruthy();
  }));
});
