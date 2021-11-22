export default class RequestBodyHelper {
  static getFindFalconReqBody(selectedPlanets: Array<any>): any {
    return {
      token: null,
      planet_names: selectedPlanets.map(planet => planet.planet.name),
      vehicle_names: selectedPlanets.map(vehicle => vehicle.vehicle.name),
    };
  }
}
