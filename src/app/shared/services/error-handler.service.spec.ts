import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler.service';
class MockToastrService {
  success() {}
  error() {}
}
describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ToastrService,
          useClass: MockToastrService
        }
      ]
    });
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should handle http error', () => {
    const httpError = {
      error: new HttpErrorResponse({})
    }
    service.handleError(httpError)
    expect(service).toBeTruthy();
  });
  it('should handle general error', () => {
    const error = {
      error: new Error('test')
    }
    service.handleError(error)
    expect(service).toBeTruthy();
  });
});
