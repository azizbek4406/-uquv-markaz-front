import { TestBed } from '@angular/core/testing';

import { TulovService } from './tulov.service';

describe('TulovService', () => {
  let service: TulovService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TulovService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
