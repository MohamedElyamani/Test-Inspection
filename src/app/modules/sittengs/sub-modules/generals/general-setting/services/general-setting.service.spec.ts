/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeneralSettingService } from './general-setting.service';

describe('Service: GeneralSetting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralSettingService]
    });
  });

  it('should ...', inject([GeneralSettingService], (service: GeneralSettingService) => {
    expect(service).toBeTruthy();
  }));
});
