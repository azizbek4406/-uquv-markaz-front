import { TestBed } from '@angular/core/testing';

import { OquvchiService } from './oquvchi.service';

describe('OquvchiService', () => {
  let service: OquvchiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OquvchiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
