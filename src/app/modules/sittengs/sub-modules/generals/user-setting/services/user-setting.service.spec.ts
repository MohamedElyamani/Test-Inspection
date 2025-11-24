/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserSettingService } from './user-setting.service';

describe('Service: UserSetting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSettingService]
    });
  });

  it('should ...', inject([UserSettingService], (service: UserSettingService) => {
    expect(service).toBeTruthy();
  }));
});
