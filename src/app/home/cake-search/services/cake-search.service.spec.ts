import { TestBed } from '@angular/core/testing';

import { CakeSearchService } from './cake-search.service';

describe('CakeSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CakeSearchService = TestBed.get(CakeSearchService);
    expect(service).toBeTruthy();
  });
});
