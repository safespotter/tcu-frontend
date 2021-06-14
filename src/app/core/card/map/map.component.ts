import {Component, OnInit} from '@angular/core';
import {AgmCoreModule} from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() {
  }

  zoom = 17;

  labelOptions: {
    color: 'black',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  icon = {
    // url: '../../assets/icons/icon-72x72.png',
    scaledSize: {
      width: 30,
      height: 30
    }
  };

  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 30,
    minZoom: 8,
  };

  markers = [
    {
      lat: 39.25202,
      lng: 9.13802,
      label: 'Via Cesare Cabras'
    },
    {
      lat: 39.25791,
      lng: 9.144299,
      label: 'Via Seneca'
    }
  ];

  ngOnInit() {
  }

  onMapReady($event) {
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap($event);
  }

}

