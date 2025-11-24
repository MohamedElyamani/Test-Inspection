/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrainingProgramService } from './trainingProgram.service';

describe('Service: TrainingProgram', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingProgramService]
    });
  });

  it('should ...', inject([TrainingProgramService], (service: TrainingProgramService) => {
    expect(service).toBeTruthy();
  }));
});
