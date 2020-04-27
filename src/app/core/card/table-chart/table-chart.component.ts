import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {CustomComponent} from '../../../features/dashboard/custom/custom.component';
import {element} from 'protractor';
import {Info} from './info.model';
import {SocketioService} from '../../../shared/_services/socketio.service';

@Component({
  selector: 'app-table-chart',
  templateUrl: './table-chart.component.html',
  styleUrls: ['./table-chart.component.scss']
})

export class TableChartComponent implements OnInit {

  table = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'button'];
  // dataSource = new MatTableDataSource<Info>(INFO_DATA);
  dataSource;
  prova;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    public dialog: MatDialog,
    public dialogComponent: DialogComponent,
    public srv: SocketioService
  ) {}
    ngOnInit(){
    this.srv.listen('dataUpdate').subscribe((res: any) => {
      const tmp = res[0];
      console.log(tmp)
      this.dataSource = new MatTableDataSource<Info>(tmp);
      this.dataSource.paginator = this.paginator;
    });

    console.log(this.dataSource);


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
