/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PresetsService } from './presets.service';

describe('Service: Presets', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PresetsService]
    });
  });

  it('should ...', inject([PresetsService], (service: PresetsService) => {
    expect(service).toBeTruthy();
  }));
});
