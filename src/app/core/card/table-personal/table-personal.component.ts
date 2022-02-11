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
  alert_name = '';
  date = '';
  lamp = '';
  drawables;
  load = false;

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

  openVideoclipModal(videoclip, alert_name, date, drawables) {
    this.videoclip = videoclip;
    this.alert_name = alert_name;
    this.date = date;
    this.lamp = this.data.street;
    this.drawables = drawables;
    this.modalRef = this.modalService.show(this.videoclipModal,
      {
        class: 'modal-dialog modal-xl',
        keyboard: false,
        backdrop: 'static'
      });
    this.drawCanvas();
  }

  play() {
    const v: HTMLVideoElement = document.querySelector('#v');
    const btn1: HTMLButtonElement = document.querySelector('#btn1');
    const btn2: HTMLButtonElement = document.querySelector('#btn2');
    const btn3: HTMLButtonElement = document.querySelector('#btn3');
    v.play();
    btn1.disabled = true;
    btn2.disabled = false;
    btn3.disabled = false;
  }

  pause() {
    const v: HTMLVideoElement = document.querySelector('#v');
    const btn1: HTMLButtonElement = document.querySelector('#btn1');
    const btn2: HTMLButtonElement = document.querySelector('#btn2');
    const btn3: HTMLButtonElement = document.querySelector('#btn3');
    v.pause();
    btn1.disabled = false;
    btn2.disabled = true;
    btn3.disabled = false;
  }

  restart() {
    const v: HTMLVideoElement = document.querySelector('#v');
    const btn1: HTMLButtonElement = document.querySelector('#btn1');
    const btn2: HTMLButtonElement = document.querySelector('#btn2');
    const btn3: HTMLButtonElement = document.querySelector('#btn3');
    v.currentTime = 0;
    v.play();
    btn1.disabled = true;
    btn2.disabled = false;
    btn3.disabled = false;
  }

  drawCanvas = () => {
    try {
      const a: HTMLCanvasElement = document.querySelector('#a');
      const v: HTMLVideoElement = document.querySelector('#v');
      const btn1: HTMLButtonElement = document.querySelector('#btn1');
      const btn2: HTMLButtonElement = document.querySelector('#btn2');
      const ctx = a.getContext('2d');
      a.width = v.videoWidth;
      a.height = v.videoHeight;
      ctx.drawImage(v, 0, 0, a.width, a.height);

      if (this.drawables != undefined) {
        for (const el of this.drawables) {
          const diff = (el['time'] / 1000) - v.currentTime;
          if (diff < 0.1 && diff > -1) {
            if (el['type'] == 'box') {
              ctx.drawImage(v, 0, 0, a.width, a.height);
              ctx.strokeStyle = 'red';
              ctx.lineWidth = 7;
              ctx.rect(el['left'], el['top'], el['right'] - el['left'], el['bottom'] - el['top']);
              ctx.stroke();
            }
          }
        }
      }

      if (v.currentTime === v.duration) {
        btn1.disabled = false;
        btn2.disabled = true;
      }

      requestAnimationFrame(this.drawCanvas);
    } catch (e) {
    }
  };

  closeModal() {
    this.modalRef.hide();

  }

  /*metodo che inizializza la tabella nella dialog*/
  getStatus(): void {
    const curDate = new Date();

    this.safespotter.getLampStatus(this.data.id).subscribe(
      data => {
        for (const el of Object.entries(data['data'])) {
          if (el[1]['alert_id'] != 5) {
            if ((curDate.getTime() - new Date(el[1]['date']).getTime()) / (1000 * 3600 * 24) <= 7) {
              this.statusList.push({
                'date': el[1]['date'],
                'videoURL': el[1]['videoURL'] || '',
                'alert_id': el[1]['alert_id'] || '',
                'alert_name': this.datasev.convertAnomalies(el[1]['alert_id']),
                'drawables': el[1]['drawables'] || []
              });
            } else {
              this.statusList.push({
                'date': el[1]['date'],
                'videoURL': '',
                'alert_id': el[1]['alert_id'] || '',
                'alert_name': this.datasev.convertAnomalies(el[1]['alert_id']),
                'drawables': el[1]['drawables'] || []
              });
            }
          }
        }
        this.load = true;
        this.dataSource = new MatTableDataSource<LampStatus>(this.statusList);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

}
