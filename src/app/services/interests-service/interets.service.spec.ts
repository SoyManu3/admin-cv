import { TestBed } from '@angular/core/testing';

import { InteretsService } from './interets.service';

describe('InteretsService', () => {
  let service: InteretsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteretsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
