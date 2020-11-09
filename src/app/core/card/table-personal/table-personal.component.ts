import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SafespotterService} from '../../../shared/_services/safespotter.service';
import {LampStatus} from '../../../shared/_models/LampStatus';
import {environment} from '../../../../environments/environment';
import {DialogModel} from '../../../shared/_models/dialog.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-table-personal',
  templateUrl: './table-personal.component.html',
  styleUrls: ['./table-personal.component.scss']
})
export class TablePersonalComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  formatUrl = environment.protocol + environment.host + ':' + environment.port;
  displayedColumns = ['date', 'status', 'videoURL'];
  dataSource = new MatTableDataSource();
  statusList = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModel,
              private safespotter: SafespotterService) {
  }

  ngOnInit(): void {
    this.getStatus();
    this.dataSource = new MatTableDataSource<LampStatus>([]);
  }

  getStatus(): void {

    this.safespotter.getLampStatus(this.data.id).subscribe(
      data => {
        for (const el of Object.entries(data['data'])) {
          this.statusList.push({'date': el[1]['date'], 'status': el[1]['status'], 'videoURL': el[1]['videoURL'] || ''});
        }
        this.dataSource = new MatTableDataSource<LampStatus>(this.statusList);
        this.dataSource.paginator = this.paginator;
      }
    );
  }
}
