import { PipesModule } from './../library/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreensRoutingModule } from './screens-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MissionComponent } from './mission/mission.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [MissionComponent],
  imports: [
    CommonModule,
    ScreensRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    DragDropModule,
  ],
})
export class ScreensModule {}
