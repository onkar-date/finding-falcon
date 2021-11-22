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
    return from(
      fetch('assets/config/app-config.json', { cache: 'no-cache' }).then(response => {
        return response.json();
      })
    ).pipe(
      map(config => {
        window.config = config;
        return config;
      })
    ).toPromise();
  }
}
