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
  ) {
  }

  ngOnInit() {

  }

  async ngAfterViewInit() {

    await this.srv.listen('dataUpdate').subscribe((res: any) => {
      this.tmp = res[0];
      for (const el of this.tmp) {
        if (el.critical_issues === 5) {
          this.flag = true;
        }
      }
      this.flag ? this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'button', 'gear', 'info', 'condition', 'allert'] :
        this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'button', 'gear', 'info', 'condition'];
      // this.timerChamge();

      this.tmp.sort((a, b) => (a.critical_issues > b.critical_issues ? -1 : 1));

      this.dataSource = new MatTableDataSource<Info>(this.tmp);

      this.grey = res[1];
      this.dataSource.paginator = this.paginator;

    });
  }

  openDialog(info: Info) {
    this.dialog.open(DialogComponent, {
      data: {
        ip: info.condition,
        critical_issues: info.critical_issues,
        info: info.street,
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


  openDialogrequest(info: Info) {
    this.dialog.open(ActionRequestComponent, {
      data: {
        condition: info.condition,
        critical_issues: info.critical_issues,
        info: info.street,
        id: info.id,
        street: info.street,
        position: info.position,
        condition_convert: info.condition_convert

      }
    });
  }

  openConfiguration(info: Info) {
    this.dialog.open(LamppostConfigurationComponent, {
      data: {
        condition: info.condition,
        critical_issues: info.critical_issues,
        info: info.street,
        id: info.id,
        street: info.street,
        position: info.position,
        condition_convert: info.condition_convert

      }
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


// const INFO_DATA: Info[] = [
//   {position: "1", street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: "2", street: 'via. san giorgio', ip: '192.168.0.1', critical_issues: 'A'},
//   {position: "3", street: 'via. san giorgio', ip: '127.0.0.6', critical_issues: 'C'},
//   {position: 4, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 5, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 6, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 7, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 8, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 9, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 10, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 11, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 12, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 13, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 14, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 15, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 16, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 17, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 18, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 19, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
//   {position: 20, street: 'via. san giorgio', ip: '127.0.0.1', critical_issues: 'H'},
// ];
