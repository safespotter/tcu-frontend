import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModel} from '../../../shared/_models/dialog.model';
import {MatSlideToggleChange, MatTableDataSource} from '@angular/material';
import {LampStatus} from '../../../shared/_models/LampStatus';

@Component({
  selector: 'app-lamppost-configuration',
  templateUrl: './lamppost-configuration.component.html',
  styleUrls: ['./lamppost-configuration.component.scss']
})
export class LamppostConfigurationComponent implements OnInit {
  title: string;
  displayedColumns = ['Anomalia', 'Allerta verde', 'Allerta gialla', 'Allerta arancione', 'Allerta rossa'];
  dataSource = new MatTableDataSource();
  criticalIssues = [{name: 'Marcia contromano'}, {name: 'Pedone sulla carreggiata'}, {name: 'Traffico congestionato'}];


  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogModel
  ) {
  }

  async ngOnInit() {
    this.dataSource = new MatTableDataSource(this.criticalIssues);
  }

  public onToggle(event: MatSlideToggleChange, element) {
    console.log('toggle', event.checked);
    console.log('element', element);
  }
}


