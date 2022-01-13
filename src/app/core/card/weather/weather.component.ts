import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeatherModel} from '../../../shared/_models/weather.model';
import {WeatherService} from '../../../shared/_services/weather.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private weatherService: WeatherService
  ) {
  }

  @Input() isCurrentWeatherLiveReady;
  @Input() isCurrentWeatherReady;
  currentWeather: WeatherModel;
  currentWeatherLive;
  dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

  ngOnInit(): void {
    // console.log('weather.component - init');
    this.getWeather();
    this.getWeatherLive();
  }

  getWeather(): void {
    this.weatherService.getLive().subscribe(data => {
      this.isCurrentWeatherReady = true;
      this.currentWeather = data;
    });
  }

  getWeatherLive() {
    this.weatherService.getLiveWeather().subscribe(data => {
      this.isCurrentWeatherLiveReady = true;
      this.currentWeatherLive = data;
    });
  }

  updateWeather(): void {
    this.getWeather();
    this.getWeatherLive();
    this.toastr.info('', 'Meteo aggiornato');
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
        return 'Velature';
      case 'clouds':
        return 'Nuvoloso';
      default:
        return 'Errore';
    }
  }

}
