import { TestBed } from '@angular/core/testing';

import { LavanderiaService } from './lavanderia.service';

describe('LavanderiaService', () => {
  let service: LavanderiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LavanderiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
