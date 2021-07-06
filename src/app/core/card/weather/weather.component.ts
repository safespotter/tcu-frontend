import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeatherModel} from '../../../shared/_models/weather.model';
import {WeatherService} from '../../../shared/_services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private weatherService: WeatherService
  ) {
  }

  currentWeather: WeatherModel;
  dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

  ngOnInit(): void {
    // console.log('weather.component - init');
    this.getWeather();
  }

  getWeather(): void {
    this.weatherService.getLive().subscribe(data => this.currentWeather = data);
  }

  conditionConverter(condition) {
    switch (condition) {
      case 'clear':
        return 'Sereno';
      case 'thunders':
        return 'Temporale';
      case 'drizzle':
      case 'light rain':
        return 'Pioggia leggera';
      case 'rain':
        return 'Pioggia';
      case 'snow':
        return 'Neve';
      case 'fog':
        return 'Nebbia';
      case 'light clouds':
        return 'parzialmente nuvoloso';
      case 'clouds':
        return 'Nuvoloso';
      default:
        return 'errore';
    }
  }

}
