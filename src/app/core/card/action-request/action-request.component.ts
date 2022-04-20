import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModel} from '../../../shared/_models/dialog.model';
import {Info} from '../../../shared/_models/info.model';
import {DataService} from '../../../shared/_services/data.service';
import {SafespotterService} from '../../../shared/_services/safespotter.service';
import {MatTableDataSource} from '@angular/material/table';
import {LampStatus} from '../../../shared/_models/LampStatus';
import * as moment from 'moment';
import {environment} from '../../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-action-request',
  templateUrl: './action-request.component.html',
  styleUrls: ['./action-request.component.scss']
})
export class ActionRequestComponent implements OnInit {
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModel,
              private datasev: DataService,
              private safespotter: SafespotterService,
              private toastr: ToastrService,
              private modalService: BsModalService
  ) {
  }

  //formatUrl = environment.protocol + environment.ftp + '/';
  formatUrl = environment.protocol + environment.ftp + '/';

  @Input() isVideoURLReady;
  panelActualValue;
  @ViewChild('panel') panelmodal: string;
  @ViewChild('openVideoclip') videoclipModal: string;
  videoURL;
  modalRef: BsModalRef;
  panelCurrentValue;
  radioCheck = {
    value0: false,
    value1: false,
    value2: false,
    value3: false
  };
  drawables;
  videoclip;

  async ngOnInit() {
    this.panelValue();
    this.getVideoURL();
    setTimeout(this.drawCanvas, 1000);
  }

  formatDate(date): string {
    date = moment(date, null, 'it', true);
    date = date.local().format('DD MMMM YYYY, H:mm');
    return date.toString();
  }

  play() {
    const v: HTMLVideoElement = document.querySelector('#vAzione');
    const btn1: HTMLButtonElement = document.querySelector('#btn1');
    const btn2: HTMLButtonElement = document.querySelector('#btn2');
    const btn3: HTMLButtonElement = document.querySelector('#btn3');
    v.play();
    btn1.disabled = true;
    btn2.disabled = false;
    btn3.disabled = false;
  }

  pause() {
    const v: HTMLVideoElement = document.querySelector('#vAzione');
    const btn1: HTMLButtonElement = document.querySelector('#btn1');
    const btn2: HTMLButtonElement = document.querySelector('#btn2');
    const btn3: HTMLButtonElement = document.querySelector('#btn3');
    v.pause();
    btn1.disabled = false;
    btn2.disabled = true;
    btn3.disabled = false;
  }

  restart(){
    const v: HTMLVideoElement = document.querySelector('#vAzione');
    const btn1: HTMLButtonElement = document.querySelector('#btn1');
    const btn2: HTMLButtonElement = document.querySelector('#btn2');
    const btn3: HTMLButtonElement = document.querySelector('#btn3');
    v.currentTime = 0;
    v.play();
    btn1.disabled = true;
    btn2.disabled = false;
    btn3.disabled = false;
  }


  panelValue() {
    const panels = this.safespotter.getPanelsStatus(this.data.id).subscribe(res => {
      //attributo status
      this.panelActualValue = Object.values(res)[2];
      switch (Object.values(res)[2]) {
        case 0:
          this.radioCheck.value0 = true;
          this.panelCurrentValue = parseInt('0', 10);
          break;
        case 1:
          this.radioCheck.value1 = true;
          this.panelCurrentValue = parseInt('1', 10);
          break;
        case 2:
          this.radioCheck.value2 = true;
          this.panelCurrentValue = parseInt('2', 10);
          break;
        case 3:
          this.radioCheck.value3 = true;
          this.panelCurrentValue = parseInt('3', 10);
          break;
        default:
          this.radioCheck.value0 = true;
          this.panelCurrentValue = 0;
      }
    });
  }

  openVideoclipModal(videoclip, drawables) {
    this.videoclip = videoclip;
    this.drawables = drawables;
    this.modalRef = this.modalService.show(this.videoclipModal,
      {
        class: 'modal-dialog modal-xl',
        keyboard: false,
        backdrop: 'static'
      });
    this.drawCanvas();
  }

  getVideoURL() {
    let videoURL = '';
    let drawables = [];
    const curDate = new Date();
    this.safespotter.getLampStatus(this.data.id).subscribe(
      data => {
        videoURL = data['data'][0]['videoURL'];
        drawables = data['data'][0]['drawables'];
        if (videoURL !== undefined) {
          if (((curDate.getTime() - new Date(data['data'][0]['date']).getTime()) < 60000)) {
            this.videoURL = 'loading';
            this.drawables = drawables;
            this.isVideoURLReady = true;
          } else {
            this.videoURL = this.formatUrl + videoURL;
            this.drawables = drawables;
            this.isVideoURLReady = true;
          }
        }
      }
    );
  }

  actionRequest(info: Info) {
    const param = {
      id: info.id,
      street: info.street,
      condition: info.condition,
      critical_issues: 0
    };

    this.datasev.actionRequest(param).subscribe();
  }

  openCam() {
    window.open(this.data.ip_cam_brand, '_blank');
  }

  updateActionRequiredAlert() {

    this.safespotter.getLamppost(this.data.id).subscribe(
      res => {
        const body = {
          lamp_id: this.data.id,
          notification_id: this.data.notification_id,
          date: res['date']
        };

        this.safespotter.updateActionRequiredAlert(body).subscribe(
          data => {
            this.toastr.info('', 'Allerta rimossa con successo');
          }, error => {
            this.toastr.warning('Allerta rimossa in precedenza', 'Attenzione');
          }
        );

      }, error => {
        this.toastr.warning('Errore', 'Attenzione');
      }
    );


  }

  onItemChange(value) {
    this.panelCurrentValue = parseInt(value, 10);
  }

  updatePanel() {

    const body = {
      lamp_id: this.data.id,
      panel: this.panelCurrentValue,
      date: this.data.date
    };

    this.safespotter.updatePanel(body).subscribe(
      data => {
        this.toastr.info('', 'Pannello aggiornato con successo');
        this.modalRef.hide();
      }, error => {
        this.toastr.warning('Pannello non aggiornato', 'Attenzione');
      }
    );
  }

  openModal(modal) {
    this.panelValue();
    this.modalRef = this.modalService.show(modal,
      {
        class: 'modal-sm modal-dialog-centered',
        keyboard: false
      });
  }

  sendAlternativeRoutes() {
    const body = {
      lamp_id: this.data.id,
      alert_id: this.data.alert_id
    };

    this.safespotter.alternativeRoutes(body).subscribe(
      data => {
        this.toastr.info('', 'Percorsi alternativi suggeriti con successo sui canali Telegram e Tetralert');
      }, error => {
        this.toastr.warning('Percorsi alternativi non impostati', 'Attenzione');
      }
    );
  }

  parsePanelValue(value) {
    switch (value) {
      case 0:
        return 'DISATTIVATO';
      case 1:
        return 'RISCHIO MODERATO';
      case 2:
        return 'RISCHIO ELEVATO';
      case 3:
        return 'PERICOLO';
      default:
        return 'ERRORE';
    }
  }

  drawCanvas = () => {
    try {
      const canvas: HTMLCanvasElement = document.querySelector('#canvAzione');
      const video: HTMLVideoElement = document.querySelector('#vAzione');
      const btn1: HTMLButtonElement = document.querySelector('#btn1');
      const btn2: HTMLButtonElement = document.querySelector('#btn2');
      const ctx = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;


      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (this.drawables != undefined) {
        for (const el of this.drawables) {
          const diff = (el['time'] / 1000) - video.currentTime;
          if (diff < 0.1 && diff > -1) {
            if (el['type'] == 'box') {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              ctx.strokeStyle = 'red';
              ctx.lineWidth = 7;
              ctx.rect(el['left'], el['top'], el['right'] - el['left'], el['bottom'] - el['top']);
              ctx.stroke();
            }
          }
        }
      }
      if (video.currentTime === video.duration) {
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
}


