import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiKey, Service} from '../_models/ApiKeys';
import {environment} from '../../../environments/environment';
import {StoreService} from './store.service';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class ApiKeysService {

  constructor(private http: HttpClient,
              private storeService: StoreService) {
  }

  registerKey(api: ApiKey) {
    return this.http.post(this.formatUrl('insert'), api);
  }

  updateKey(api: ApiKey) {
    const headers = this.getAuthorization();
    return this.http.put(this.formatUrl('update'), {api}, {headers});
  }

  isPermissionGranted(idService: number) {
    const headers = this.getAuthorization();
    return this.http.get<Service>(this.formatUrl('isPermissionGranted/' + idService), {headers})
      .pipe(map((res) => res), catchError(e => of(e)));
  }

  revokePermissions(idService: number) {
    const headers = this.getAuthorization();
    return this.http.request('delete', this.formatUrl('revokePermissions/' + idService), {headers});
  }

  getAllKeys() {
    const headers = this.getAuthorization();
    return this.http.get<ApiKey>(this.formatUrl('getAll'), {headers});
  }

  checkIfKeyExists(type: number) {
    const headers = this.getAuthorization();
    return this.http.get(this.formatUrl('checkIfExists/' + type), {headers});
  }

  deleteKey(service) {
    return this.http.request('delete', this.formatUrl('delete'),
      {body: {service_id: service}});
  }

  private formatUrl(call): string {
    return environment.protocol + environment.host + ':' + environment.port + '/keys/' + call;
  }

  private getAuthorization() {
    return new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${this.storeService.getToken()}`);
  }




}
