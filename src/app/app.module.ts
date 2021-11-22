import { FooterComponent } from './library/shared-components/footer/footer.component';
import { NavbarComponent } from './library/shared-components/navbar/navbar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScreensModule } from './screens/screens.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScreensModule,
    NgbModule,
    DragDropModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      easing: 'ease-in'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
