import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModel} from "./dialog.model";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  title: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModel) {}

}
