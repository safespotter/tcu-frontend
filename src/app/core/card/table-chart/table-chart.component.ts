import {AfterViewInit, Component, Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {CustomComponent} from '../../../features/dashboard/custom/custom.component';
import {element} from 'protractor';
import {Info} from '../../../shared/_models/info.model';
import {SocketioService} from '../../../shared/_services/socketio.service';
import {timeout} from 'rxjs/operators';
import set = Reflect.set;
import {DataService} from '../../../shared/_services/data.service';
import {ActionRequestComponent} from '../action-request/action-request.component';
import {LamppostConfigurationComponent} from '../lamppost-configuration/lamppost-configuration.component';
import {LamppostConfiguration} from '../../../shared/_models/LamppostConfiguration';
import {SafespotterService} from '../../../shared/_services/safespotter.service';

@Component({
  selector: 'app-table-chart',
  templateUrl: './table-chart.component.html',
  styleUrls: ['./table-chart.component.scss']
})

export class TableChartComponent implements OnInit, AfterViewInit {

  table = [];
  displayedColumns: string[];
  // dataSource = new MatTableDataSource<Info>(INFO_DATA);
  dataSource;
  tmp;
  grey = 0;
  flag = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Output() elementSelected = new EventEmitter<string>();

  constructor(
    public dialog: MatDialog,
    public dialogComponent: DialogComponent,
    public srv: SocketioService,
    private datasev: DataService,
    private safeSpotter: SafespotterService
  ) {
  }

  ngOnInit() {

  }

  async ngAfterViewInit() {

    await this.srv.listen('dataUpdate').subscribe((res: any) => {
      this.tmp = res[0];
      for (const el of this.tmp) {
        el.alert_name = this.datasev.convertAnomalies(el.alert_id);
        if (el.anomaly_level >= 3) {
          this.flag = true;
        }
      }

      this.flag ? this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'info', 'condition', 'alert', 'button', 'gear'] :
        this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'info', 'condition', 'button', 'gear'];
      // this.timerChamge();

      this.tmp.sort((a, b) => (a.anomaly_level > b.anomaly_level ? -1 : 1));

      this.dataSource = new MatTableDataSource<Info>(this.tmp);
      this.grey = res[1];
      this.dataSource.paginator = this.paginator;

    });
  }

  openDialog(info: Info) {
    this.dialog.open(DialogComponent, {
      height: '90%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {
        ip: info.condition,
        anomaly_level: info.anomaly_level,
        alert_id: info.alert_id,
        id: info.id,
        street: info.street,
        position: info.position,
      }
    });

  }


  convertAnomalyLevel(anomaly_level) {

    switch (anomaly_level) {
      case 0:
        return 'NESSUNA';
      case 1:
        return 'VERDE';
      case 2:
        return 'GIALLA';
      case 3:
        return 'ARANCIONE';
      case 4:
        return 'ROSSA';
    }
  }

  openDialogrequest(info) {
    this.dialog.open(ActionRequestComponent, {
      height: '90%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {
        anomaly_level: info.anomaly_level,
        alert_id: info.alert_id,
        id: info.id,
        street: info.street,
        position: info.position,
        alert_name: this.datasev.convertAnomalies(info.alert_id),
        ip_cam_brand: info.ip_cam_brand
      }
    });
  }

  openConfiguration(info: LamppostConfiguration) {

    this.safeSpotter.getLamppostConfiguration(info.id).subscribe(result => {
      const configuration = Object.values(result)[1];
      const timers = Object.values(result)[2];
      this.dialog.open(LamppostConfigurationComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: {
          condition: info.condition,
          critical_issues: info.critical_issues,
          info: info.street,
          id: info.id,
          street: info.street,
          position: info.position,
          condition_convert: info.condition_convert,
          configuration: configuration,
          timers: timers
        }
      });
    });
  }

  getValueFromClick($event) {

    this.elementSelected.emit(Object(Object($event)));

  }

  //
  // async timerChamge() {
  //   setTimeout(() => {this.grey = 0;
  // }, 1000);
  //
  //   this.grey = 1;
  // }
}


