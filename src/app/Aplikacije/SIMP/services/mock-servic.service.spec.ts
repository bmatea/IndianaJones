import { TestBed } from '@angular/core/testing';

import { MockServicService } from './mock-servic.service';

describe('MockServicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockServicService = TestBed.get(MockServicService);
    expect(service).toBeTruthy();
  });
});
