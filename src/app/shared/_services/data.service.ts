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

  convertAnomalies(alert_id) {
    switch (parseInt(alert_id, 10)) {
      case 1:
        return 'Cambio di corsia illegale';
      case 2:
        return 'Traffico congestionato';
      case 3:
        return 'Oggetto o persona in strada';
      case 4:
        return 'Invasione di area pedonale';
      case 5:
        return 'Possible incidente';
      case 6:
        return 'Veicolo in sosta vietata';
      default:
        return 'Errore anomalia';
    }
  }

  getData() {
    const headers = this.getAuthorization();
    const params = {};
    const list = this.http.get(`${this.urlRequest}/safePath/getData`, {headers, params});
    return list;
  }


  actionRequest(params) {
    const headers = this.getAuthorization();
    try {
      const list = this.http.post(environment.protocol + environment.host + ':3000/SafeSpotter/create', params);
      return list;
    } catch (e) {
      console.log(e);
    }
    }

  private getAuthorization = () => new HttpHeaders()
  .set('Content-type', 'application/json')
  .set('Authorization', `Bearer ${this.storeService.getToken()}`)

  checkNotification(notification) {
    const headers = this.getAuthorization();
    const params = {};
    const res = this.http.post(`${this.urlRequest}/safePath/checkNotification`, notification, {headers, params});
    res.subscribe(o => console.log(o)); // if nothing is subscribed the request is ignored, so might as well log it
  }

}
