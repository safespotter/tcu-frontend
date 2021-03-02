import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModel} from '../../../shared/_models/dialog.model';
import {MatSlideToggleChange, MatTableDataSource} from '@angular/material';
import {LampStatus} from '../../../shared/_models/LampStatus';
import {SafespotterService} from '../../../shared/_services/safespotter.service';

@Component({
  selector: 'app-lamppost-configuration',
  templateUrl: './lamppost-configuration.component.html',
  styleUrls: ['./lamppost-configuration.component.scss']
})
export class LamppostConfigurationComponent implements OnInit {
  title: string;
  displayedColumns = ['Anomalia', 'Allerta verde', 'Allerta gialla', 'Allerta arancione', 'Allerta rossa'];
  dataSource = new MatTableDataSource();
  criticalIssues = [
    {id: '1', name: 'Marcia contromano', c_v: false, c_g: false, c_o: false, c_r: false, d_v: false, d_g: false, d_o: false, d_r: false},
    {id: '2', name: 'Pedone sulla carreggiata', c_v: false, c_g: false, c_o: false, c_r: false, d_v: false, d_g: false, d_o: false, d_r: false},
    {id: '3', name: 'Traffico congestionato', c_v: false, c_g: false, c_o: false, c_r: false, d_v: false, d_g: false, d_o: false, d_r: false}
  ];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel,
    private safeSpotter: SafespotterService
  ) {
  }

  async ngOnInit() {
    this.initializeSlider(this.data);
    this.dataSource = new MatTableDataSource(this.criticalIssues);
  }

  initializeSlider(data) {

    const config = data.configuration;

    for(let ci of this.criticalIssues){
      for(let el of config){
        if (ci.id == el.alert_id){
          switch (el.configuration_type){
            case '4':
              ci.c_v = true;
              ci.c_g = true;
              ci.c_o = true;
              ci.c_r = true;
              ci.d_v = true;
              ci.d_g = true;
              ci.d_o = true;
              ci.d_r = false;
              break;
            case '3':
              ci.c_v = true;
              ci.c_g = true;
              ci.c_o = true;
              ci.c_r = false;
              ci.d_v = true;
              ci.d_g = true;
              ci.d_o = false;
              ci.d_r = false;
              break;
            case '2':
              ci.c_v = true;
              ci.c_g = true;
              ci.c_o = false;
              ci.c_r = false;
              ci.d_v = true;
              ci.d_g = false;
              ci.d_o = false;
              ci.d_r = false;
              break;
            case '1':
              ci.c_v = true;
              ci.c_g = false;
              ci.c_o = false;
              ci.c_r = false;
              ci.d_v = false;
              ci.d_g = false;
              ci.d_o = false;
              ci.d_r = false;
              break;
            default:
              ci.c_v = false;
              ci.c_g = false;
              ci.c_o = false;
              ci.c_r = false;
              ci.d_v = false;
              ci.d_g = false;
              ci.d_o = false;
              ci.d_r = false;
              break;
          }
        }
      }
    }
  }

  public onToggle(event: MatSlideToggleChange, lampId, element, alertColor) {

    //nessuna notifica -> 0
    //notifica verde   -> 1
    //notifica gialla  -> 2
    //notifica arancio -> 3
    //notifica rossa   -> 4

    const confType = {no_type: '0', green: '1', yellow: '2', orange: '3', red: '4'};
    const alertId = element.id;

    if (alertColor === 'red' && event.checked) {
      element.c_v = true;
      element.c_g = true;
      element.c_o = true;
      element.c_r = true;
      element.d_v = true;
      element.d_g = true;
      element.d_o = true;
      element.d_r = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.red).toPromise();
    }

    if (alertColor === 'red' && !event.checked) {
      element.c_v = true;
      element.c_g = true;
      element.c_o = true;
      element.c_r = false;
      element.d_v = true;
      element.d_g = true;
      element.d_o = false;
      element.d_r = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.orange).toPromise();
    }

    if (alertColor === 'orange' && event.checked) {
      element.c_v = true;
      element.c_g = true;
      element.c_o = true;
      element.c_r = false;
      element.d_v = true;
      element.d_g = true;
      element.d_o = false;
      element.d_r = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.orange).toPromise();
    }

    if (alertColor === 'orange' && !event.checked) {
      element.c_v = true;
      element.c_g = true;
      element.c_o = false;
      element.c_r = false;
      element.d_v = true;
      element.d_g = false;
      element.d_o = false;
      element.d_r = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.yellow).toPromise();
    }

    if (alertColor === 'yellow' && event.checked) {
      element.c_v = true;
      element.c_g = true;
      element.c_o = false;
      element.c_r = false;
      element.d_v = true;
      element.d_g = false;
      element.d_o = false;
      element.d_r = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.yellow).toPromise();
    }

    if (alertColor === 'yellow' && !event.checked) {
      element.c_v = true;
      element.c_g = false;
      element.c_o = false;
      element.c_r = false;
      element.d_v = false;
      element.d_g = false;
      element.d_o = false;
      element.d_r = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.green).toPromise();
    }

    if (alertColor === 'green' && event.checked) {
      element.c_v = true;
      element.c_g = false;
      element.c_o = false;
      element.c_r = false;
      element.d_v = false;
      element.d_g = false;
      element.d_o = false;
      element.d_r = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.green).toPromise();
    }

    if (alertColor === 'green' && !event.checked) {
      element.c_v = false;
      element.c_g = false;
      element.c_o = false;
      element.c_r = false;
      element.d_v = false;
      element.d_g = false;
      element.d_o = false;
      element.d_r = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.no_type).toPromise();
    }

  }
}


