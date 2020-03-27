import { TestBed } from '@angular/core/testing';

import { PregledZahtjevaService } from './pregled-zahtjeva.service';

describe('PregledZahtjevaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PregledZahtjevaService = TestBed.get(PregledZahtjevaService);
    expect(service).toBeTruthy();
  });
});
