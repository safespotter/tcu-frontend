import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherModel } from '../../../shared/_models/weather.model';
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
  ) { }

  currentWeather: WeatherModel;
  dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

  ngOnInit(): void {
    // console.log('weather.component - init');
    this.getWeather();
  }

  getWeather(): void {
    this.weatherService.getLive().subscribe(data => this.currentWeather = data);
  }

}
