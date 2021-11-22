import { IPlanet } from './../../shared/interfaces/planets.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDestinations'
})
export class FilterDestinationsPipe implements PipeTransform {

  transform(
    planets: Array<IPlanet>,
    controls,
    index: number
  ): Array<any> {
    const currentControlId = 'destination' + index;
    const selectedPlanets = Object.values(controls);
    return planets.filter(planet => {
      if (planet.name === controls[currentControlId]) {
        return true;
      }
      if (selectedPlanets.includes(planet.name)) {
        return false;
      } else {
        return true;
      }
    });
  }

}
