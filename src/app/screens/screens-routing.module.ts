import { ResultComponent } from './result/result.component';
import { MissionComponent } from './mission/mission.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'mission',
    component: MissionComponent
  },
  {
    path: 'result/:planet/:time',
    component: ResultComponent
  },
  {
    path: '**',
    redirectTo: 'mission'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreensRoutingModule { }
