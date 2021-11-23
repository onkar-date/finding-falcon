import { ToastrService } from 'ngx-toastr';
import { TestBed } from '@angular/core/testing';

import { ToasterService } from './toaster.service';

class MockToastrService {
  success() {}
  error() { }
  warning() {}
}
describe('ToasterService', () => {
  let service: ToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ToastrService,
          useClass: MockToastrService
        }
      ]
    });
    service = TestBed.inject(ToasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should test success method', () => {
    service.success('test');
    expect(service).toBeTruthy();
  });
  it('should test error method', () => {
    service.error('test');
    expect(service).toBeTruthy();
  });
  it('should test warning method', () => {
    service.warning('test');
    expect(service).toBeTruthy();
  });
});
