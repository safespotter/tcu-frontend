import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {StoreService} from './store.service';

@Injectable()
export class DataService {
  private urlRequest = `${environment.protocol}${environment.host}:${environment.port}`;

  constructor(
    private http: HttpClient,
    private storeService: StoreService,
  ) {
  }

  anomalyList = [{id: 1, value: 'Violaz. carreggiata o senso di marcia'},
    {id: 2, value: 'Traffico congestionato'},
    {id: 3, value: 'Oggetto o persona in strada'},
    {id: 4, value: 'Invasione isola di traffico/marciapiede'},
    {id: 5, value: 'Potenziale sinistro'},
    {id: 6, value: 'Sosta o fermata vietata'},
    {id: 7, value: 'Guida imprudente'}
  ];

  getAnomalyList() {
    return this.anomalyList;
  }

  convertAnomalies(alert_id) {
    switch (parseInt(alert_id, 10)) {
      case 1:
        return 'Violaz. carreggiata o senso di marcia';
      case 2:
        return 'Traffico congestionato';
      case 3:
        return 'Oggetto o persona in strada';
      case 4:
        return 'Invasione isola di traffico/marciapiede';
      case 5:
        return 'Potenziale sinistro';
      case 6:
        return 'Sosta o fermata vietata';
      case 7:
        return 'Guida imprudente';
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
    .set('Authorization', `Bearer ${this.storeService.getToken()}`);

  checkNotification(notification) {
    const headers = this.getAuthorization();
    const params = {};
    const res = this.http.post(`${this.urlRequest}/safePath/checkNotification`, notification, {headers, params});
    res.subscribe(o => console.log(o)); // if nothing is subscribed the request is ignored, so might as well log it
  }

}
