import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModel} from '../../../shared/_models/dialog.model';
import {MatSlideToggleChange, MatTableDataSource} from '@angular/material';
import {LampStatus} from '../../../shared/_models/LampStatus';

@Component({
  selector: 'app-lamppost-configuration',
  templateUrl: './lamppost-configuration.component.html',
  styleUrls: ['./lamppost-configuration.component.scss']
})
export class LamppostConfigurationComponent implements OnInit {
  title: string;
  displayedColumns = ['Anomalia', 'Allerta verde', 'Allerta gialla', 'Allerta arancione', 'Allerta rossa'];
  dataSource = new MatTableDataSource();
  criticalIssues = [{
    name: 'Marcia contromano',
    c_v: false,
    c_g: false,
    c_o: false,
    c_r: false,
    d_v: false,
    d_g: false,
    d_o: false,
    d_r: false
  },
    {name: 'Pedone sulla carreggiata', c_v: false, c_g: false, c_o: false, c_r: false, d_v: false, d_g: false, d_o: false, d_r: false},
    {name: 'Traffico congestionato', c_v: false, c_g: false, c_o: false, c_r: false, d_v: false, d_g: false, d_o: false, d_r: false}];


  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModel
  ) {
  }

  async ngOnInit() {
    this.dataSource = new MatTableDataSource(this.criticalIssues);
  }

  public onToggle(event: MatSlideToggleChange, element, alert_color) {
    console.log('toggle', event.checked);
    console.log('element', element);

    if (alert_color === 'red' && event.checked) {
      element.c_v = true;
      element.c_g = true;
      element.c_o = true;
      element.c_r = true;
      element.d_v = true;
      element.d_g = true;
      element.d_o = true;
      element.d_r = false;
    }

    if (alert_color === 'red' && !event.checked) {
      element.c_v = true;
      element.c_g = true;
      element.c_o = true;
      element.c_r = false;
      element.d_v = true;
      element.d_g = true;
      element.d_o = false;
      element.d_r = false;
    }

    if (alert_color === 'orange' && event.checked) {
      element.c_v = true;
      element.c_g = true;
      element.c_o = true;
      element.c_r = false;
      element.d_v = true;
      element.d_g = true;
      element.d_o = false;
      element.d_r = false;
    }

    if (alert_color === 'orange' && !event.checked) {
      element.c_v = true;
      element.c_g = true;
      element.c_o = false;
      element.c_r = false;
      element.d_v = true;
      element.d_g = false;
      element.d_o = false;
      element.d_r = false;
    }

    if (alert_color === 'yellow' && event.checked) {
      element.c_v = true;
      element.c_g = true;
      element.c_o = false;
      element.c_r = false;
      element.d_v = true;
      element.d_g = false;
      element.d_o = false;
      element.d_r = false;
    }

    if (alert_color === 'yellow' && !event.checked) {
      element.c_v = true;
      element.c_g = false;
      element.c_o = false;
      element.c_r = false;
      element.d_v = false;
      element.d_g = false;
      element.d_o = false;
      element.d_r = false;
    }

    if (alert_color === 'green' && event.checked) {
      element.c_v = true;
      element.c_g = false;
      element.c_o = false;
      element.c_r = false;
      element.d_v = false;
      element.d_g = false;
      element.d_o = false;
      element.d_r = false;
    }

    if (alert_color === 'green' && !event.checked) {
      element.c_v = false;
      element.c_g = false;
      element.c_o = false;
      element.c_r = false;
      element.d_v = false;
      element.d_g = false;
      element.d_o = false;
      element.d_r = false;
    }

  }
}


