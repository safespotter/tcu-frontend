import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {StoreService} from './store.service';

@Injectable()
export  class DataService {
  private urlRequest = `${environment.protocol}${environment.host}:${environment.port}`;

  constructor(
    private http: HttpClient,
    private storeService: StoreService,
  ) {
  }

  getData(ip: string) {
    const headers = this.getAuthorization();
    const params = {
      ip: ip,
    };

    return this.http.get(`${this.urlRequest}/data`, {headers, params});
  }



  private getAuthorization = () => new HttpHeaders()
  .set('Content-type', 'application/json')
  .set('Authorization', `Bearer ${this.storeService.getToken()}`)

}
