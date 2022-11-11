import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {SafespotterService} from '../../shared/_services/safespotter.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import * as moment from 'moment';

export interface Anomaly {
  lamp_id: string;
  message: string;
  anomaly_name: string;
  date: string;
}

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Input() isAnomaliesReady: any;
  displayedColumns: string[] = ['date', 'message'];
  anomalies: Anomaly[] = [];
  dataSource = new MatTableDataSource<Anomaly>();

  constructor(private safespotterService: SafespotterService) {
    this.getLastAnomalies();
    this.dataSource = new MatTableDataSource<Anomaly>([]);
  }

  formatDate(date: any): string {
    date = moment(date, undefined, 'it', true);
    date = date.local().format('DD MMMM YYYY, H:mm');
    return date.toString();
  }

  lamp_names(lamp_id: any): string {
    switch (lamp_id) {
      case 1:
        return 'via Caracalla';
      case 2:
        return 'via Caracalla';
      case 3:
        return 'via Riu Mortu';
      case 4:
        return 'via Riu Mortu';
      default:
        return 'Errore';
    }
  }



  convertAnomalies(alert_id: any) {
    switch (parseInt(alert_id, 10)) {
      case 1:
        return 'violaz. carreggiata o senso di marcia';
      case 2:
        return 'traffico congestionato';
      case 3:
        return 'oggetto o persona in strada';
      case 4:
        return 'invasione isola di traffico/marciapiede';
      case 5:
        return 'potenziale sinistro';
      case 6:
        return 'sosta o fermata vietata';
      case 7:
        return 'guida imprudente';
      default:
        return 'errore anomalia';
    }
  }

  alternativeRoutes(lamp_id: any): string {
    switch (lamp_id) {
      case 1:
        return 'Si suggerisce il percorso alternativo in Via Fonni o Via Porto Rotondo  per chi proviene da Via Porto Botte, in ' +
          'Via Argentina o Via Decio Mure per chi proviene da Via San Fulgenzio o da Via Dell’Argine. ';
      case 2:
        return  ' Si suggerisce il percorso alternativo in Via Fonni o Via Porto Rotondo  per chi proviene da Via Porto Botte, ' +
          'in Via Argentina o Via Decio Mure per chi proviene da Via San Fulgenzio o da Via Dell’Argine.';
      case 3:
        return  'Si suggerisce il percorso alternativo in Via Deroma o Via Terralba  ' +
          'per chi proviene da Via San Valeriano, in Via Monte Arci per chi proviene da Viale Trieste, ' +
          'in Via Del Redentore per chi proviene da Via Zuddas.';
      case 4:
        return  'Si suggerisce il percorso alternativo in Via San Silvestro per chi proviene da Via Cabras, ' +
          'in Via Monte Arci per chi proviene da Viale Trieste, in Via Del Redentore per chi proviene da Via Zuddas.';
      default:
        return 'Errore';
    }
  }
  getLastAnomalies() {
    this.safespotterService.getAnomalies().subscribe(
      data => {
        for (const el of Object.entries(data)) {
          let message;
          for (const anomaly of el[1]) {
            message = this.lamp_names(anomaly['lamp_id']);
            this.anomalies.push({
              'lamp_id': anomaly['lamp_id'],
              'message': message,
              'anomaly_name': anomaly['alert_id'],
              'date': anomaly['date']
            });
          }
        }
        this.isAnomaliesReady = true;
        this.dataSource = new MatTableDataSource<Anomaly>(this.anomalies);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  ngOnInit(): void {
  }

}
