import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherSnapshot } from './WeatherSnapshot';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  currentWeather: WeatherSnapshot = {
    time: new Date('2020-11-29T11:00:00.000Z'),
    coordinates: { lat: 39.2599, lon: 9.1397 },
    temp: 13.18,
    pressure: 1005.38,
    humidity: 78.66,
    conditions: 'cloudy',
    precipitation: { type: 'none', value: 0 },
    wind: { direction: 323.65, speed: 2.26 }
  };

  ngOnInit(): void { }

}
