import { TestBed } from '@angular/core/testing';

import { OqituvchiService } from './oqituvchi.service';

describe('OqituvchiService', () => {
  let service: OqituvchiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OqituvchiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
