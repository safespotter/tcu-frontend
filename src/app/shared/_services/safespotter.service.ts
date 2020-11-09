import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {StoreService} from './store.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class SafespotterService {

  private urlRequest = `${environment.protocol}${environment.host}:${environment.port}`;

  constructor(
    private http: HttpClient,
    private storeService: StoreService) {
  }

  getLampStatus(id) {
    const headers = this.getAuthorization();
    return this.http.get(this.formatUrl('getStreetLampStatus/') + id, {headers});
  }

  private formatUrl(call): string {
    return environment.protocol + environment.host + ':' + environment.port + '/safePath/' + call;
  }

  private getAuthorization() {
    return new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${this.storeService.getToken()}`);
  }
}
