import {AfterViewInit, Component, Directive, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
        if (el.anomaly_level >= 3) {
          this.flag = true;
        }
      }

      this.flag ? this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'button', 'gear', 'info', 'condition', 'allert'] :
        this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'button', 'gear', 'info', 'condition'];
      // this.timerChamge();

      this.tmp.sort((a, b) => (a.anomaly_level > b.anomaly_level ? -1 : 1));

      console.log("dati ", this.tmp);

      this.dataSource = new MatTableDataSource<Info>(this.tmp);
      console.log("dataSource ", this.dataSource);
      this.grey = res[1];
      this.dataSource.paginator = this.paginator;

    });
  }

  openDialog(info: Info) {
    this.dialog.open(DialogComponent, {
      data: {
        ip: info.condition,
        anomaly_level: info.anomaly_level,
        alert_id: info.alert_type,
        id: info.id,
        street: info.street,
        position: info.position,
      }
    });

  }


  convertCondition(info) {
    // tslint:disable-next-line:radix
    switch (parseInt(info.condition)) {
      case 0:
        info.condition_convert = 'NESSUNA';
      case 1:
        info.condition_convert = 'BASSA';
      case 2:
        info.condition_convert = 'DISCRETA';
      case 3:
        info.condition_convert = 'MODERATA';
      case 4:
        info.condition_convert = 'ALTA';
      case 5:
        info.condition_convert = 'MASSIMA';
    }
  }

  convertAnomalies(alert_id) {
    switch (parseInt(alert_id, 10)) {
      case 1:
        return 'Illegal way crossing';
      case 2:
        return 'Traffic congestion';
      case 3:
        return 'Object on the road';
      case 4:
        return 'Screeching halt';
      case 5:
        return 'Too high/slow car speed';
      case 6:
        return 'Pedestrian Area Invasion';
      case 7:
        return 'Failure to give way';
      case 8:
        return 'Possible Accident';
      default:
        return 'Anomaly error';
    }
  }

  openDialogrequest(info: Info) {
    this.dialog.open(ActionRequestComponent, {
      data: {
        condition: info.condition,
        anomaly_level: info.anomaly_level,
        id: info.id,
        street: info.street,
        position: info.position,
      }
    });
  }

  openConfiguration(info: LamppostConfiguration) {

    this.safeSpotter.getLamppostConfiguration(info.id).subscribe(result => {
      const configuration = Object.values(result)[1];
      this.dialog.open(LamppostConfigurationComponent, {
        data: {
          condition: info.condition,
          critical_issues: info.critical_issues,
          info: info.street,
          id: info.id,
          street: info.street,
          position: info.position,
          condition_convert: info.condition_convert,
          configuration: configuration
        }
      });
    });
  }


  //
  // async timerChamge() {
  //   setTimeout(() => {this.grey = 0;
  // }, 1000);
  //
  //   this.grey = 1;
  // }
}


