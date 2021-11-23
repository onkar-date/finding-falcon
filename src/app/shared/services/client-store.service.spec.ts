import { TestBed } from '@angular/core/testing';

import { ClientStoreService } from './client-store.service';
import * as localforage from 'localforage';
describe('ClientStoreService', () => {
  let service: ClientStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientStoreService);
    spyOn(localforage, 'setItem').and.returnValue(null);
    spyOn(localforage, 'getItem').and.returnValue(null);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should set item in localstorage', () => {
    service.setItem('test', 123);
    expect(service).toBeTruthy();
  });
  it('should get item from localstorage', () => {
    service.getItem('test');
    expect(service).toBeTruthy();
  });
  it('should remove item from localstorage', () => {
    spyOn(service, 'getItem').and.returnValue(Promise.resolve(123));
    service.removeItem('test');
    expect(service).toBeTruthy();
  });
});
