import {Component, Directive, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {CustomComponent} from '../../../features/dashboard/custom/custom.component';
import {element} from 'protractor';
import {Info} from './info.model';
import {SocketioService} from '../../../shared/_services/socketio.service';
import {timeout} from 'rxjs/operators';
import set = Reflect.set;

@Component({
  selector: 'app-table-chart',
  templateUrl: './table-chart.component.html',
  styleUrls: ['./table-chart.component.scss']
})

export class TableChartComponent implements OnInit {

  table = [];
  displayedColumns: string[];
  // dataSource = new MatTableDataSource<Info>(INFO_DATA);
  dataSource;
  grey = 0;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public dialogComponent: DialogComponent,
    public srv: SocketioService
  ) {}

    ngOnInit() {
    this.srv.listen('dataUpdate').subscribe((res: any) => {
      res[2] && res[2] == 1 ? this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'button', 'allert'] :
        this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'button', ];
      this.timerChamge();
      const tmp = res[0];
      tmp.sort((a, b) => (a.critical_issues > b.critical_issues ? -1 : 1));

      this.dataSource = new MatTableDataSource<Info>(tmp);
      // if(tmp && this.tmp_change && tmp != this.tmp_change){
      //   for(const i in tmp){
      //
      //     if(tmp[i].id === this.tmp_change[i].id && tmp[i].critical_issues !== this.tmp_change[i].critical_issues){
      //       console.log('che succede', tmp[i].id, (tmp[i].id === this.tmp_change[i].id && tmp[i].critical_issues !== this.tmp_change[i].critical_issues))
      //       this.grey = tmp[i].id;
      //      // console.log('ciao sono qui', this.grey);
      //     }
      //   }
      // }

      this.grey = res[1];

      console.log(this.grey)
      this.dataSource.paginator = this.paginator;

    });
  }

  openDialog(info: Info) {
    this.dialog.open(DialogComponent, {
      data: {
        ip: info.ip,
        critical_issues: info.critical_issues,
        info: info.street
      }
    });
  }

  async timerChamge() {
    setTimeout(() => {this.grey = 0;
  }, 1000);

    this.grey = 1;
  }
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
