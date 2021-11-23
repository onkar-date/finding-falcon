import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
declare var window: any;
@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor() { }

  public init(): Promise<any> {
    return Promise.resolve(true);
  }
}
