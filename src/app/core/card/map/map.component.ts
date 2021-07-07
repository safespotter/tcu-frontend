import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../../../shared/_services/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private datasev: DataService) {
  }

  @Input() isMarkersReady;
  @Output() mapSelected = new EventEmitter<string>();
  markers = [];

  zoom = 17;

  labelOptions: {
    color: 'black',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  icon = {
    url: '../../assets/icons/map-icon.png',
    scaledSize: {
      width: 30,
      height: 30
    }
  };

  styles = [{
    featureType: "poi",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }];

  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'satellite',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 30,
    minZoom: 8
  };

  ngOnInit() {
    this.getMarkers();
  }

  getMarkers() {
    this.datasev.getData().subscribe(result => {
      for (const el of Object.values(result)) {
        this.markers.push({
          lat: el.lat,
          lng: el.long,
          label: el.street,
          id: el.id,
          ip: el.ip
        });
      }
      this.isMarkersReady = true;
    });
  }

  onMapReady($event) {
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap($event);
  }

  markerClicked($event: MouseEvent) {
    this.mapSelected.emit(Object($event));
  }

}

