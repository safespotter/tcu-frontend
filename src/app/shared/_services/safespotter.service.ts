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

  updateLamppostConfiguration(lamp_id, alert_id, configuration_type) {
    const headers = this.getAuthorization();
    const body = {
      alert_id: alert_id,
      configuration_type: configuration_type
    };
    return this.http.put(this.formatUrl('updateLamppostConfiguration/') + lamp_id, body, {headers});
  }

  getLamppostConfiguration(lamp_id) {
    const headers = this.getAuthorization();
    return this.http.get(this.formatUrl('getLamppostConfiguration/') + lamp_id, {headers});
  }

  updateLamppostTimer(lamp_id, alert_level, timer) {
    const headers = this.getAuthorization();
    const body = {
      alert_level: alert_level,
      timer: timer
    };
    return this.http.put(this.formatUrl('updateLamppostTimer/') + lamp_id, body, {headers});
  }

  getLamppostTimers(lamp_id) {
    const headers = this.getAuthorization();
    return this.http.get(this.formatUrl('getLamppostTimers/') + lamp_id, {headers});
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
