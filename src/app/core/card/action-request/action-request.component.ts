import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModel} from '../../../shared/_models/dialog.model';
import {Info} from '../../../shared/_models/info.model';
import {DataService} from '../../../shared/_services/data.service';
import {SafespotterService} from '../../../shared/_services/safespotter.service';
import {MatTableDataSource} from '@angular/material/table';
import {LampStatus} from '../../../shared/_models/LampStatus';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-action-request',
  templateUrl: './action-request.component.html',
  styleUrls: ['./action-request.component.scss']
})
export class ActionRequestComponent implements OnInit {
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModel,
              private datasev: DataService,
              private safespotter: SafespotterService
  ) {
  }
  formatUrl = environment.protocol + environment.host + ':' + environment.port;
  @Input() isVideoURLReady;
  videoURL;

  async ngOnInit() {
    this.getVideoURL();
  }

  getVideoURL() {
    let videoURL = '';
    this.safespotter.getLampStatus(this.data.id).subscribe(
      data => {
        videoURL = String(Object.entries((data['data'])[1])[5][1]);
        this.videoURL = this.formatUrl + videoURL;
        this.isVideoURLReady = true;
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

}


