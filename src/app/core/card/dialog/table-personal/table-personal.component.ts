import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-table-personal',
  templateUrl: './table-personal.component.html',
  styleUrls: ['./table-personal.component.scss']
})
export class TablePersonalComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns = ['date', 'critical issues'];
  dataSource = new MatTableDataSource<Event>(INFO_DATA);
  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

}

export interface Event {
  date: string;
  critica_issues: number;
}

const INFO_DATA: Event[] = [
  {date: "22-05-2020 12:20:00", critica_issues: 5},
  {date: "22-05-2020 16:05:01", critica_issues: 4},
  {date: "22-05-2020 16:05:01", critica_issues: 4},
  {date: "22-05-2020 16:05:01", critica_issues: 5},
  {date: "22-05-2020 16:05:01", critica_issues: 4},

];
