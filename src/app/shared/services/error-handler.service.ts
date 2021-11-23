import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private injector: Injector, private ngZone: NgZone) {}

  handleError(error: any): void {
    console.log(error);
    
    if (
      error.error instanceof HttpErrorResponse ||
      (error['rejection'] && error['rejection'] instanceof HttpErrorResponse)
    ) {
      const httpError: HttpErrorResponse = error['rejection']
        ? error['rejection']
        : error;
      if (!navigator.onLine) {
        this.showToastr(new Error('Check your internet connection!!'))
      } else {
        this.showToastr(httpError);
      }
    } else {
      this.showToastr(new Error('Something went wrong'))
    }
  }

  showToastr(error: any) {
    this.ngZone.run(() => {
      const toastr = this.injector.get(ToastrService);
      const message = this.getErrorMessage(error);
      if (message) {
        toastr.error(message, '', {
          timeOut: 10000,
          positionClass: 'toast-bottom-right',
          closeButton: true,
          easing: 'ease-in',
        });
      }
    });
  }

  getErrorMessage(error: any): string | undefined {
    return error.error?.message ?? error.message;
  }
}
