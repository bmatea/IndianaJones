import { TestBed } from '@angular/core/testing';

import { TkSuglasnostService } from './tk-suglasnost.service';

describe('TkSuglasnostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TkSuglasnostService = TestBed.get(TkSuglasnostService);
    expect(service).toBeTruthy();
  });
});
