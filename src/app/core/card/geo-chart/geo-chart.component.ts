import {Component, OnInit, ViewChild} from '@angular/core';
import { Color, Label } from 'ng2-charts';
import {GoogleChartComponent, } from 'ng2-google-charts';
import {GoogleChartInterface} from 'ng2-google-charts/google-charts-interfaces';



@Component({
  selector: 'app-geo-chart',
  templateUrl: './geo-chart.component.html',
  styleUrls: ['./geo-chart.component.scss']
})
export class GeoChartComponent  {
  public map: GoogleChartInterface = {
    chartType: 'GeoChart',
    dataTable: [
      ['Country', 'Population'],
      ['China', 'China: 1,363,800,000'],
      ['India', 'India: 1,242,620,000'],
      ['US', 'US: 317,842,000'],
      ['Indonesia', 'Indonesia: 247,424,598'],
      ['Brazil', 'Brazil: 201,032,714'],
      ['Pakistan', 'Pakistan: 186,134,000'],
      ['Nigeria', 'Nigeria: 173,615,000'],
      ['Bangladesh', 'Bangladesh: 152,518,015'],
      ['Russia', 'Russia: 146,019,512'],
      ['Japan', 'Japan: 127,120,000']
    ],
    //firstRowIsData: true,
    options: {
      showTooltip: true,
      showInfoWindow: true
    },
  };

}
