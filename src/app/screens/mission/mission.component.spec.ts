import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { FalconService } from './../../shared/services/falcon.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionComponent } from './mission.component';

class MockFalconService {
  getPlanetsData() {
    return [
      {
        name: 'Donlon',
        distance: 100,
      },
      {
        name: 'Enchai',
        distance: 200,
      },
      {
        name: 'Jebing',
        distance: 300,
      },
      {
        name: 'Sapir',
        distance: 400,
      },
      {
        name: 'Lerbin',
        distance: 500,
      },
      {
        name: 'Pingasor',
        distance: 600,
      },
    ];
  }

  getvehiclesData() {
    return [
      {
        name: 'Space pod',
        total_no: 2,
        max_distance: 200,
        speed: 2,
      },
      {
        name: 'Space rocket',
        total_no: 1,
        max_distance: 300,
        speed: 4,
      },
      {
        name: 'Space shuttle',
        total_no: 1,
        max_distance: 400,
        speed: 5,
      },
      {
        name: 'Space ship',
        total_no: 2,
        max_distance: 600,
        speed: 10,
      },
    ];
  }

  gettoken() {}

  findFalcon(requestBody: any) {}
}
class MockToastrService {
  success() {}
  error() {}
}
describe('MissionComponent', () => {
  let component: MissionComponent;
  let fixture: ComponentFixture<MissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        DragDropModule,
        RouterTestingModule.withRoutes([
          {
            path: '**',
            component: MissionComponent
          }
        ]),
      ],
      declarations: [MissionComponent],
      providers: [
        HttpClientModule,
        {
          provide: FalconService,
          useClass: MockFalconService,
        },
        {
          provide: ToastrService,
          useClass: MockToastrService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(async () => {
    fixture = TestBed.createComponent(MissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should update user selections', () => {
    const selectedPlanet = {
      name: 'Donlon',
      distance: 100,
    };
    const selectedVehicle = {
      name: 'Space ship',
      total_no: 2,
      max_distance: 600,
      speed: 10,
    };
    component.selectedPlanets[0].planet = selectedPlanet;
    spyOn(component, 'calculateTotalTimeTaken').and.returnValue(null);
    component.updateUserSelection(selectedPlanet, selectedVehicle);
    expect(component.selectedPlanets[0].vehicle).toEqual(selectedVehicle);
  });
  it('should reset all the data when reset clicked', () => {
    const selectedPlanet = {
      name: 'Donlon',
      distance: 100,
    };
    component.selectedPlanets[0].planet = selectedPlanet;
    component.reset();
    const isReseted = component.selectedPlanets.every((selection) => {
      return selection.planet === null;
    });
    expect(isReseted).toEqual(true);
  });
  it('should test find falcon method - when data is not valid', async () => {
    const toastrService = TestBed.inject(ToastrService);
    const errorMethodSpy = spyOn(toastrService, 'error');
    await component.findFalcon();
    expect(errorMethodSpy).toHaveBeenCalled();
  });
  it('should test find falcon method - when data is valid and planet is not found', async () => {
    const toastrService = TestBed.inject(ToastrService);
    const errorMethodSpy = spyOn(toastrService, 'error');
    spyOn(component, 'isDataValid').and.returnValue(true);
    const selectedPlanet = {
      name: 'Donlon',
      distance: 100,
    };
    const selectedVehicle = {
      name: 'Space ship',
      total_no: 2,
      max_distance: 600,
      speed: 10,
    };
    component.selectedPlanets = [
      {
        planet: selectedPlanet,
        vehicle: selectedVehicle,
      },
    ];
    const falconService = TestBed.inject(FalconService);
    spyOn(falconService, 'findFalcon').and.returnValue(
      Promise.resolve({ status: 'failure' })
    );
    await component.findFalcon();
    expect(errorMethodSpy).toHaveBeenCalled();
  });
  it('should test find falcon method - when data is valid and planet found', async () => {
    const toastrService = TestBed.inject(ToastrService);
    const errorMethodSpy = spyOn(toastrService, 'error');
    spyOn(component, 'isDataValid').and.returnValue(true);
    const selectedPlanet = {
      name: 'Donlon',
      distance: 100,
    };
    const selectedVehicle = {
      name: 'Space ship',
      total_no: 2,
      max_distance: 600,
      speed: 10,
    };
    component.selectedPlanets = [
      {
        planet: selectedPlanet,
        vehicle: selectedVehicle,
      },
    ];
    const falconService = TestBed.inject(FalconService);
    spyOn(falconService, 'findFalcon').and.returnValue(
      Promise.resolve({ status: 'success', planet_name: 'test' })
    );
    await component.findFalcon();
    expect(errorMethodSpy).toHaveBeenCalledTimes(0);
  });
  it('should calculate total time taken to find falcon', () => {
    const selectedPlanet = {
      name: 'Donlon',
      distance: 100,
    };
    const selectedVehicle = {
      name: 'Space ship',
      total_no: 2,
      max_distance: 600,
      speed: 10,
    };
    component.selectedPlanets = [
      {
        planet: selectedPlanet,
        vehicle: selectedVehicle,
      },
    ];
    component.calculateTotalTimeTaken();
    expect(component.totalTimeTaken).toEqual(10);
  });
  it('should test dropListEnterPredicate method', () => {
    const method = component.dropListEnterPredicate({ planet: null });
    expect(method()).toEqual(true);
  });
});
