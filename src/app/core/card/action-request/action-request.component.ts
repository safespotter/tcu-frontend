import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModel} from '../../../shared/_models/dialog.model';
import {Info} from "../../../shared/_models/info.model";
import {DataService} from "../../../shared/_services/data.service";

@Component({
  selector: 'app-action-request',
  templateUrl: './action-request.component.html',
  styleUrls: ['./action-request.component.scss']
})
export class ActionRequestComponent implements OnInit {
  title: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModel,
              private datasev: DataService,
  ) {}

  ngOnInit(): void {
  }


  actionRequest(info: Info) {
    const param= {
      "id" : info.id,
      "street" : info.street,
      "ip" : info.ip,
      "critical_issues" : 1
    }
    this.datasev.actionRequest(param).subscribe();
  }

}


