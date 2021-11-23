import { TestBed } from '@angular/core/testing';

import { AppInitService } from './app-init.service';

describe('AppInitService', () => {
  let service: AppInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should test init method', async () => {
    const res = await service.init()
    expect(res).toEqual(true);
  });
});
