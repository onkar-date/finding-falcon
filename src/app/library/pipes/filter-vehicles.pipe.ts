import { IPlanet } from './../../shared/interfaces/planets.interface';
import { IVehicle } from './../../shared/interfaces/vehicle.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterVehicles'
})
export class FilterVehiclesPipe implements PipeTransform {

  transform(vehicles: IVehicle[], vehicleForm, planetsData: IPlanet[], selectedDestination): IVehicle[] {
    const distance = planetsData.find(planet => planet.name === selectedDestination).distance;
    console.log(selectedDestination);
    console.log(distance);
    const vehiclesSelected = Object.values(vehicleForm);
    vehicles.map(vehicle => {
      const currentVehicleSelections = vehiclesSelected.filter(_ => _ === vehicle.name).length;
      vehicle.available = vehicle.total_no - currentVehicleSelections;
      vehicle.canTravel = vehicle.max_distance >= distance;
    });
    return vehicles;
  }

}
