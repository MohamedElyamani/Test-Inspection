/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InterviewEvaluationService } from './interviewEvaluation.service';

describe('Service: InterviewEvaluation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterviewEvaluationService]
    });
  });

  it('should ...', inject([InterviewEvaluationService], (service: InterviewEvaluationService) => {
    expect(service).toBeTruthy();
  }));
});
