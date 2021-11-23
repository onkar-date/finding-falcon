import { WrapperService } from './wrapper.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { FalconService } from './falcon.service';
class MockWrapperService{
  Api() {}
}
describe('FalconService', () => {
  let service: FalconService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: WrapperService,
          useClass: MockWrapperService
        }
      ]
    });
    service = TestBed.inject(FalconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should test getPlanetsData method', async () => {
    await service.getPlanetsData()
    expect(service).toBeTruthy();
  });
  it('should test getvehiclesData method', async () => {
    await service.getvehiclesData()
    expect(service).toBeTruthy();
  });
  it('should test gettoken method', async () => {
    const wrapperService = TestBed.inject(WrapperService);
    spyOn(wrapperService, 'Api').and.returnValue(Promise.resolve({ token: 'test' }));
    await service.getToken()
    expect(service).toBeTruthy();
  });
  it('should test findFalcon method', async () => {
    spyOn(service, 'getToken').and.returnValue(Promise.resolve(123))
    await service.findFalcon({token: 123})
    expect(service).toBeTruthy();
  });
});
