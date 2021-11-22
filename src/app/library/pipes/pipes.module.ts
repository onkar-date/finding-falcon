import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDestinationsPipe } from './filter-destinations.pipe';
import { FilterVehiclesPipe } from './filter-vehicles.pipe';



@NgModule({
  declarations: [FilterDestinationsPipe, FilterVehiclesPipe],
  imports: [
    CommonModule
  ],
  exports: [FilterDestinationsPipe, FilterVehiclesPipe]
})
export class PipesModule { }
