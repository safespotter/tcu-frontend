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
  @ViewChild('panel') panelmodal: string;
  videoURL;
  modalRef: BsModalRef;
  panelCurrentValue;
  radioCheck = {
    value0: false,
    value1: false,
    value2: false,
    value3: false
  };

  async ngOnInit() {
    this.panelValue();
    this.getVideoURL();
  }

  formatDate(date): string {
    date = moment(date, null, 'it', true);
    date = date.local().format('DD MMMM YYYY, H:mm');
    return date.toString();
  }

  panelValue() {
    switch (this.data.panel) {
      case 0:
        this.radioCheck.value0 = true;
        this.panelCurrentValue = parseInt('0', 10);
        break;
      case 1:
        this.radioCheck.value1 = true;
        this.panelCurrentValue = parseInt('1', 10);;
        break;
      case 2:
        this.radioCheck.value2 = true;
        this.panelCurrentValue = parseInt('2', 10);;
        break;
      case 3:
        this.radioCheck.value3 = true;
        this.panelCurrentValue = parseInt('3', 10);;
        break;
      default:
        this.radioCheck.value0 = true;
        this.panelCurrentValue = 0;
    }
  }

  getVideoURL() {
    let videoURL = '';
    this.safespotter.getLampStatus(this.data.id).subscribe(
      data => {
        videoURL = data['data'][0]['videoURL'];
        if(videoURL !== undefined){
          this.videoURL = this.formatUrl + videoURL;
          this.isVideoURLReady = true;
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
    const body = {
      lamp_id: this.data.id,
      notification_id: this.data.notification_id
    };

    this.safespotter.updateActionRequiredAlert(body).subscribe(
      data => {
        this.toastr.info('', 'Allerta rimossa con successo');
      }, error => {
        this.toastr.warning('Allerta rimossa in precedenza', 'Attenzione');
      }
    );

  }

  onItemChange(value) {
    this.panelCurrentValue = parseInt(value, 10);
  }

  updatePanel() {

    const body = {
      lamp_id: this.data.id,
      panel: this.panelCurrentValue
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
    this.modalRef = this.modalService.show(modal,
      {
        class: 'modal-sm modal-dialog-centered',
        keyboard: false
      });
  }

  closeModal() {
    this.modalRef.hide();
  }
}


