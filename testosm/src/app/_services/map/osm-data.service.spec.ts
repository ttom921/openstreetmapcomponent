import { TestBed } from '@angular/core/testing';

import { OsmDataService } from './osm-data.service';

describe('OsmDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OsmDataService = TestBed.get(OsmDataService);
    expect(service).toBeTruthy();
  });
});
