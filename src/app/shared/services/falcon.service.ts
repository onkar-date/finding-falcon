import { IPlanet } from './../interfaces/planets.interface';
import { ApiMethod, APIUrl } from './../constants/api';
import { WrapperService } from './wrapper.service';
import { Injectable } from '@angular/core';
import { IVehicle } from '../interfaces/vehicle.interface';

@Injectable({
  providedIn: 'root'
})
export class FalconService {

  constructor(
    private wrapperService: WrapperService
  ) { }

  async getPlanetsData(): Promise<IPlanet[]> {
    const planetsDataUrl = APIUrl.planetsData;
    const planetData = await this.wrapperService.Api(ApiMethod.GET, planetsDataUrl);
    return planetData;
  }

  async getvehiclesData(): Promise<IVehicle[]> {
    const vehiclesDataUrl = APIUrl.vehiclesData;
    const vehicleData = await this.wrapperService.Api(ApiMethod.GET, vehiclesDataUrl);
    return vehicleData;
  }

  async gettoken(): Promise<any> {
    const tokenUrl = APIUrl.token;
    const token = await this.wrapperService.Api(ApiMethod.POST, tokenUrl, null, {});
    return token.token;
  }

  async findFalcon(requestBody: any): Promise<any> {
    const findFalconUrl = APIUrl.findFalcon;
    const token = await this.gettoken();
    requestBody.token = token;
    const response = await this.wrapperService.Api(ApiMethod.POST, findFalconUrl, null, requestBody);
    return response;
  }

}
