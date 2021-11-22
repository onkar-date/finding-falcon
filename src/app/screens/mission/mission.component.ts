import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import RequestBodyHelper from 'src/app/shared/helpers/request-body.helper';
import { IPlanet } from 'src/app/shared/interfaces/planets.interface';
import { IVehicle } from 'src/app/shared/interfaces/vehicle.interface';
import { FalconService } from 'src/app/shared/services/falcon.service';
import ConfettiGenerator from "confetti-js";
@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styles: [],
})
export class MissionComponent implements OnInit {
  public confetti: ConfettiGenerator;
  planetsData: IPlanet[] = null;
  vehiclesData: IVehicle[] = null;
  selectedPlanets = [
    {
      planet: null,
      vehicle: null,
    },
    {
      planet: null,
      vehicle: null,
    },
    {
      planet: null,
      vehicle: null,
    },
    {
      planet: null,
      vehicle: null,
    },
  ];
  vehicleAvailability = {};
  falconFoundOnPlanet = '';
  totalTimeTaken = 0;
  constructor(
    private falconService: FalconService,
    private toastr: ToastrService
  ) { }

  async ngOnInit(): Promise<void> {
    this.planetsData = await this.getPlanetsData();
    this.vehiclesData = await this.getVehicleSData();
    console.log(this.vehiclesData);
    
    this.setVehicleAvailability();
  }

  async getPlanetsData(): Promise<IPlanet[]> {
    const planetsData = await this.falconService.getPlanetsData();
    return planetsData;
  }

  async getVehicleSData(): Promise<IVehicle[]> {
    const vehicleSData = await this.falconService.getvehiclesData();
    return vehicleSData;
  }

  setVehicleAvailability(): void {
    this.vehiclesData?.forEach((vehicle) => {
      this.vehicleAvailability[vehicle.name] = {
        count: vehicle.total_no,
      };
    });
  }

  updateUserSelection(selectedPlanet, selectedVehicle: IVehicle): void {
    const dataChanged = this.selectedPlanets.find((planet) => {
      return planet.planet?.name === selectedPlanet.name;
    });
    dataChanged.vehicle = selectedVehicle;
    this.setVehicleAvailability();
    this.selectedPlanets.forEach((planet) => {
      if (planet.vehicle) {
        this.vehicleAvailability[planet.vehicle.name].count -= 1;
      }
    });
    this.calculateTotalTimeTaken();
  }

  reset(): void {
    this.clearConfetti();
    this.totalTimeTaken = 0;
    this.selectedPlanets.forEach(selection => {
      if (selection.planet) {
        this.planetsData.push(selection.planet);
        selection.planet = null;
      }
      selection.vehicle = null;
    });
    this.setVehicleAvailability();
  }

  async findFalcon(): Promise<void> {
    if (this.isDataValid()) {
      const reqBody = RequestBodyHelper.getFindFalconReqBody(
        this.selectedPlanets
      );
      const res = await this.falconService.findFalcon(reqBody);
      if (res.status === 'success') {
        this.toastr.success(`Falcon Found on planet ${res.planet_name}`);
        this.falconFoundOnPlanet = res.planet_name;
        this.showConfetti();
      } else {
        this.toastr.error('Falcon not found... Mission failed...!!!');
      }
    } else {
      this.toastr.error('Please select all the targets and vehicles...!!');
    }
  }

  showConfetti() {
    document.getElementById('my-canvas').style.zIndex = '999';
    var confettiSettings = { target: 'my-canvas' };
    this.confetti = new ConfettiGenerator(confettiSettings);
    this.confetti.render();
    setTimeout( () => {
      this.clearConfetti();
    }, 3000); // Stop confetti after 3 seconds
  }

  clearConfetti() {
    document.getElementById('my-canvas').style.zIndex = 'unset';
    this.confetti?.clear();
    this.clearFalconFoundPlanet();
  }

  clearFalconFoundPlanet() {
    this.falconFoundOnPlanet = '';
  }

  isDataValid(): boolean {
    const invalid = this.selectedPlanets.find((planet) => {
      return !planet.planet || !planet.vehicle;
    });
    return invalid ? false : true;
  }

  calculateTotalTimeTaken() {
    this.totalTimeTaken = 0;
    this.selectedPlanets.forEach(selection => {
      if (selection.planet && selection.vehicle) {
        this.totalTimeTaken += selection.planet.distance / selection.vehicle.speed;
      }
    })
  }

  drop(event: CdkDragDrop<string[]>): void {
    const itemToMoveAt = Number(event.container.id.split('-')[1]);
    const itemToMove = this.planetsData[event.previousIndex];
    if (this.selectedPlanets[itemToMoveAt]) {
      this.selectedPlanets[itemToMoveAt].planet = itemToMove;
      this.planetsData = this.planetsData.filter((planet) => {
        return planet.name !== itemToMove.name;
      });
    }
  }

  /** Predicate function that only allows even numbers to be dropped into a list. */
  dropListEnterPredicate(list: any): any {
    return (): boolean => {
      return !list.planet;
    };
  }
}
