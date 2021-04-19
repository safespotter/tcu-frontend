import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SafespotterService} from '../../../shared/_services/safespotter.service';
import {LampStatus} from '../../../shared/_models/LampStatus';
import {environment} from '../../../../environments/environment';
import {DialogModel} from '../../../shared/_models/dialog.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';

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

  formatDate(date): string {
    date = moment(date, null, 'it', true);
    date = date.local().format('DD MMMM YYYY, H:mm');
    return date.toString();
  }

  convertStatus(status){
    switch ( parseInt(status)) {
      case 0:
        return 'NESSUNA';
      case 1:
        return 'BASSA';
      case 2:
        return 'DISCRETA';
      case 3:
        return 'MODERATA';
      case 4:
        return 'ALTA';
      case 5:
        return 'MASSIMA';
    }
  }

  convertAnomalies(alert_id) {
    switch (parseInt(alert_id)) {
      case 1:
        return "Illegal way crossing";
      case 2:
        return "Traffic congestion";
      case 3:
        return "Object on the road";
      case 4:
        return "Screeching halt";
      case 5:
        return "Too high/slow car speed";
      case 6:
        return "Pedestrian Area Invasion";
      case 7:
        return "Failure to give way";
      case 8:
        return "Possible Accident";
      default:
        return "Anomaly error";
    }
  }

  /*metodo che inizializza la tabella nella dialog*/
  getStatus(): void {

    this.safespotter.getLampStatus(this.data.id).subscribe(
      data => {
        console.log("dati ricevuti ", data);
        for (const el of Object.entries(data['data'])) {
          this.statusList.push({'date': el[1]['date'], 'videoURL': el[1]['videoURL'] || '', 'alert_id': el[1]['alert_id'] || ''});
        }
        this.dataSource = new MatTableDataSource<LampStatus>(this.statusList);
        this.dataSource.paginator = this.paginator;
      }
    );
  }
}
