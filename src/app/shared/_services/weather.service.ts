import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StoreService} from './store.service';
import {WeatherModel} from '../_models/weather.model';
import {map} from 'rxjs/operators';

@Injectable(
  {providedIn: 'root'}
)
export class WeatherService {

  constructor(
    private http: HttpClient,
    private storeService: StoreService) {}

  private static formatUrl = call => `${environment.protocol}${environment.host}:${environment.port}/weather/${call}`;

  private static parseData(res: any) {
    res = res.data;
    // console.log('weather.service - parse');
    const imgCode = (str => {
      switch (str) {
        case 'clear':
          return '01d';
        case 'thunders':
          return '11d';
        case 'drizzle':
          return '09d';
        case 'light rain':
          return '10d';
        case 'rain':
          return '09d';
        case 'snow':
          return '13d';
        case 'fog':
          return '50d';
        case 'light clouds':
          return '02d';
        case 'clouds':
          return '04d';
        default:
          return null;
      }
    })(res.conditions);
    const imgUrl = `https://openweathermap.org/img/wn/${imgCode}@2x.png`;
    const data: WeatherModel = {
      ...(res as WeatherModel),
      time: new Date(res.time),
      imgUrl: imgCode ? imgUrl : null,
    };
    return data;
  }

  getLive() {
    const headers = this.getAuthorization();
    // console.log('weather.service - getLive');
    return this.http.get( WeatherService.formatUrl('getLive/'), {headers})
      .pipe(map(WeatherService.parseData));
  }

  getForecast() {
    // console.log('weather.service - getForecast');
    const headers = this.getAuthorization();
    return this.http.get( WeatherService.formatUrl('getForecast/'), {headers}).toPromise()
      .then( (res: any) => {
        const data: {time: Date, data: WeatherModel[]} = {time: res.time, data: []};
        for (const item of res.data) {
          data.data.push(WeatherService.parseData(item));
        }
        return data;
      });
  }

  private getAuthorization() {
    return new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${this.storeService.getToken()}`);
  }
}
