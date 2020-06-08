import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  zoom = 17
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 30,
    minZoom: 8,
  }

  // ngOnInit() {
  //
  //   navigator.geolocation.getCurrentPosition(position => {
  //     this.center = {
  //       lat: 39.252341,
  //       lng: 9.137819
  //     }
  //   })
  //
  // }
  lat : number;
  lng : number;
  labelOptions = {
    color: 'black',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    // text: "SMARTLAMP VIA CABRAS"
  }

  ngOnInit() {
    this.prepareMap() ;
  }

  prepareMap() {
    // this.lat = 39.251896;
    // this.lng = 9.138610;
    this.lat = 39.487516;
    this.lng = 9.064641;
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  onMapReady($event) {
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap($event);
  }
}

