import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WrapperService {

  constructor(private httpClient: HttpClient) { }

  public async Api(method: string, url: string, params?: any, data?: any): Promise<any> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    if (params) {
      return await this.httpClient.request(method, url, { body: data, params, headers}).toPromise();
    } else {
      return await this.httpClient.request(method, url, { body: data, headers}).toPromise();
    }
  }
}
