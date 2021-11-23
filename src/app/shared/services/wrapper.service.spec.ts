import { from, of } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WrapperService } from './wrapper.service';

describe('WrapperService', () => {
  let service: WrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(WrapperService);
    const httpCLient = TestBed.inject(HttpClient);
    spyOn(httpCLient, 'request').and.returnValue(of('test'))
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should Api method - without params', async () => {
    await service.Api('GET', 'test');
    expect(service).toBeTruthy();
  });
  it('should Api method - with params', async () => {
    await service.Api('GET', 'test', 'test');
    expect(service).toBeTruthy();
  });
});
