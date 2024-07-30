import { TestBed } from '@angular/core/testing';

import { NormativaService } from './normativa.service';

describe('NormativaService', () => {
  let service: NormativaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormativaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
