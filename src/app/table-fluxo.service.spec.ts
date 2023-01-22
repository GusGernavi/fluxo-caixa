/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TableFluxoService } from './table-fluxo.service';

describe('Service: TableFluxo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableFluxoService]
    });
  });

  it('should ...', inject([TableFluxoService], (service: TableFluxoService) => {
    expect(service).toBeTruthy();
  }));
});
