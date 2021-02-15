import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModel} from '../../../shared/_models/dialog.model';

@Component({
  selector: 'app-lamppost-configuration',
  templateUrl: './lamppost-configuration.component.html',
  styleUrls: ['./lamppost-configuration.component.scss']
})
export class LamppostConfigurationComponent implements OnInit {
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModel
  ) {
  }

  async ngOnInit() {

  }

}


