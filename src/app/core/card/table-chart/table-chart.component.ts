import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from "../dialog/dialog.component";
import {MatButtonModule} from '@angular/material/button';
import {CustomComponent} from "../../../features/dashboard/custom/custom.component";

@Component({
  selector: 'app-table-chart',
  templateUrl: './table-chart.component.html',
  styleUrls: ['./table-chart.component.scss']
})

export class TableChartComponent implements OnInit {


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'button'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    public dialog: MatDialog,
    public dialogComponent: DialogComponent,
  ) {}
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    // this.dialog.open(DialogComponent, {
    //   data: {
    //     animal: 'panda'
    //   }
    // });
  }
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'H'},
  {position: 2, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'He'},
  {position: 3, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'Li'},
  {position: 4, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'Be'},
  {position: 5, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'B'},
  {position: 6, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'C'},
  {position: 7, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'N'},
  {position: 8, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'O'},
  {position: 1, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'H'},
  {position: 2, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'He'},
  {position: 3, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'Li'},
  {position: 4, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'Be'},
  {position: 5, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'B'},
  {position: 6, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'C'},
  {position: 7, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'N'},
  {position: 8, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'O'},
  {position: 1, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'H'},
  {position: 2, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'He'},
  {position: 3, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'Li'},
  {position: 4, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'Be'},
  {position: 5, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'B'},
  {position: 6, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'C'},
  {position: 7, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'N'},
  {position: 8, name: 'via. san giorgio', weight: "127.0.0.1", symbol: 'O'},
];
