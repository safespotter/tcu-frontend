import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModel} from '../../../shared/_models/dialog.model';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  title: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModel) {}

  formatDate(date): string {
    date = moment(date, null, 'it', true);
    date = date.local().format('DD MMMM YYYY, H:mm');
    return date.toString();
  }
}
