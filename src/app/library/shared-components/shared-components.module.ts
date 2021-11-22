import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [FooterComponent, ErrorComponent],
  imports: [
    CommonModule
  ],
  exports: []
})
export class SharedComponentsModule { }
