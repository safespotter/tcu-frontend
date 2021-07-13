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
  @Input() receivedFromTable;

  @Output() mapSelected = new EventEmitter<string>();

  userLocationMarkerAnimation: string;

  markers = [];
  selectedLat;
  selectedLong;

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
      this.selectedLat = Object.values(result)[0].lat;
      this.selectedLong = Object.values(result)[0].long;
      for (const el of Object.values(result)) {
        this.markers.push({
          lat: el.lat,
          long: el.long,
          label: el.street,
          id: el.id,
          ip_cam_fix: el.ip_cam_fix
        });
      }
      this.isMarkersReady = true;
    });
  }

  mapReading() {
    this.userLocationMarkerAnimation = 'BOUNCE';

  }

  onMapReady($event) {
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap($event);
  }

  markerClicked($event: MouseEvent) {
    this.mapSelected.emit(Object($event));
  }

  updateCoordinates (lat, long){
    this.selectedLat = lat;
    this.selectedLong = long;
  }

}

