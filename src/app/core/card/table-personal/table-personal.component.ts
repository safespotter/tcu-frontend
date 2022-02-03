import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SafespotterService} from '../../../shared/_services/safespotter.service';
import {LampStatus} from '../../../shared/_models/LampStatus';
import {environment} from '../../../../environments/environment';
import {DialogModel} from '../../../shared/_models/dialog.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';
import {DataService} from '../../../shared/_services/data.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-table-personal',
  templateUrl: './table-personal.component.html',
  styleUrls: ['./table-personal.component.scss']
})
export class TablePersonalComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('openVideoclip') videoclipModal: string;
  // @ViewChild('webCamera') video: HTMLVideoElement;
  // @ViewChild('videoCanvas') canvas: HTMLCanvasElement;
  // @ViewChild('altroCanvas') altroCanvas: HTMLCanvasElement;

  // formatUrl = environment.protocol + environment.ftp + '/';
  formatUrl = environment.protocol + environment.ftp + '/';
  displayedColumns = ['date', 'status', 'videoURL'];
  dataSource = new MatTableDataSource();
  statusList = [];
  modalRef: BsModalRef;
  videoclip = '';
  a;
  b;
  v;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModel,
              private safespotter: SafespotterService,
              private datasev: DataService,
              private modalService: BsModalService) {
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

  convertAnomalies(alert_id) {
    switch (parseInt(alert_id)) {
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

  openVideoclipModal(videoclip) {
    this.videoclip = videoclip;
    this.modalRef = this.modalService.show(this.videoclipModal,
      {
        class: 'modal-xl modal-dialog-centered',
        keyboard: false,
        backdrop: 'static'
      });
    // this.drawOverlay();
    // this.drawCanvas();
    this.drawCanvas();
  }

  play() {
    const v: HTMLVideoElement = document.querySelector('#v');
    v.play();
  }

  pause() {
    const v: HTMLVideoElement = document.querySelector('#v');
    v.pause();
  }

  drawCanvas = () => {
    const a: HTMLCanvasElement = document.querySelector('#a');
    const v: HTMLVideoElement = document.querySelector('#v');
    const ctx = a.getContext('2d');
    a.width = v.videoWidth;
    a.height = v.videoHeight;

    ctx.drawImage(v, 0, 0, a.width, a.height);
    ctx.strokeStyle = 'red';

    ctx.rect(500, 500, 500, 500);
    ctx.stroke();

    requestAnimationFrame(this.drawCanvas);
  }

  closeModal() {
    this.modalRef.hide();
  }

  /*metodo che inizializza la tabella nella dialog*/
  getStatus(): void {
    const curDate = new Date();

    this.safespotter.getLampStatus(this.data.id).subscribe(
      data => {
        for (const el of Object.entries(data['data'])) {
          if ((curDate.getTime() - new Date(el[1]['date']).getTime()) / (1000 * 3600 * 24) <= 7) {
            this.statusList.push({
              'date': el[1]['date'],
              'videoURL': el[1]['videoURL'] || '',
              'alert_id': el[1]['alert_id'] || '',
              'alert_name': this.datasev.convertAnomalies(el[1]['alert_id'])
            });
          } else {
            this.statusList.push({
              'date': el[1]['date'],
              'videoURL': '',
              'alert_id': el[1]['alert_id'] || '',
              'alert_name': this.datasev.convertAnomalies(el[1]['alert_id'])
            });
          }
        }
        this.dataSource = new MatTableDataSource<LampStatus>(this.statusList);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

}
