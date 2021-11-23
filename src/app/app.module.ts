import { ErrorHandlerService } from './shared/services/error-handler.service';
import { InterceptorService } from './shared/services/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './library/shared-components/footer/footer.component';
import { NavbarComponent } from './library/shared-components/navbar/navbar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScreensModule } from './screens/screens.module';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScreensModule,
    NgbModule,
    DragDropModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      easing: 'ease-in',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
