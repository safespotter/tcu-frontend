import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../../../shared/_services/data.service';
import {SocketioService} from '../../../shared/_services/socketio.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private datasev: DataService,
              public srv: SocketioService) {
  }

  @Input() isMarkersReady;
  @Input() isPanelsReady;
  @Input() receivedFromTable;

  @Output() mapSelected = new EventEmitter<string>();

  tmp;
  panels;
  userLocationMarkerAnimation: string;
  platform = environment.platform;
  markers = [];
  panelMarkers = [];
  panelCircles = [];
  circles = [];
  selectedLat;
  selectedLong;

  zoom = 18;

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

  panelIcon = {
    url: '../../assets/icons/panel_icon.png',
    scaledSize: {
      width: 30,
      height: 30
    }
  };

  styles = [{
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {visibility: 'off'}
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
    this.srv.listen('dataUpdate').subscribe((res: any) => {
      this.markers = [];
      this.panelMarkers = [];
      this.panelCircles = [];
      this.circles = [];
      this.tmp = res[0];
      this.panels = res[5];

      console.log('panels', this.panels);

      this.tmp = this.tmp.filter(el => el.platform === this.platform);
      let flag = 0;

      for (const panel of this.panels) {
        this.panelMarkers.push({
          lat: panel.lat,
          long: panel.long,
          status: panel.status,
          via: panel.via
        });

        switch (panel.status) {
          case 1:
            this.panelCircles.push({
              lat: parseFloat(panel.lat) + 0.00003,
              long: parseFloat(panel.long) - 0.00003,
              color: 'yellow',
              opacity: '0.15'
            });
            break;
          case 2:
            this.panelCircles.push({
              lat: parseFloat(panel.lat) + 0.00003,
              long: parseFloat(panel.long) - 0.00003,
              color: 'orange',
              opacity: '0.25'
            });
            break;
          case 3:
            this.panelCircles.push({
              lat: parseFloat(panel.lat) + 0.00003,
              long: parseFloat(panel.long) - 0.00003,
              color: 'red',
              opacity: '0.25'
            });
            break;
        }
      }
      this.isPanelsReady = true;

      for (const el of this.tmp) {
        if (flag == 0) {
          this.updateCoordinates(el.lat, el.long);
        }
        this.markers.push({
          lat: el.lat,
          long: el.long,
          label: el.street,
          id: el.id,
          ip_cam_fix: el.ip_cam_fix
        });

        switch (el.anomaly_level) {
          case 1:
            this.circles.push({lat: parseFloat(el.lat) + 0.00003, long: parseFloat(el.long) - 0.00003, color: 'green', opacity: '0.15'});
            break;
          case 2:
            this.circles.push({lat: parseFloat(el.lat) + 0.00003, long: parseFloat(el.long) - 0.00003, color: 'yellow', opacity: '0.15'});
            break;
          case 3:
            this.circles.push({lat: parseFloat(el.lat) + 0.00003, long: parseFloat(el.long) - 0.00003, color: 'orange', opacity: '0.25'});
            break;
          case 4:
            this.circles.push({lat: parseFloat(el.lat) + 0.00003, long: parseFloat(el.long) - 0.00003, color: 'red', opacity: '0.25'});
            break;
        }
        flag++;
      }
      this.isMarkersReady = true;
    });
    //this.getMarkers();
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

  updateCoordinates(lat, long) {
    this.selectedLat = lat;
    this.selectedLong = long;
  }

}

