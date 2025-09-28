import { TestBed } from '@angular/core/testing';

import { GraficoSabanasService } from './grafico-sabanas.service';

describe('GraficoSabanasService', () => {
  let service: GraficoSabanasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficoSabanasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
