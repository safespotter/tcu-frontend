import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogModel} from '../../../shared/_models/dialog.model';
import {MatSlideToggleChange, MatTableDataSource} from '@angular/material';
import {LampStatus} from '../../../shared/_models/LampStatus';
import {SafespotterService} from '../../../shared/_services/safespotter.service';
import {SocketioService} from '../../../shared/_services/socketio.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-lamppost-configuration',
  templateUrl: './lamppost-configuration.component.html',
  styleUrls: ['./lamppost-configuration.component.scss']
})
export class LamppostConfigurationComponent implements OnInit {
  title: string;
  displayedColumns = ['Anomalia', 'Allerta verde', 'Allerta gialla', 'Allerta arancione', 'Allerta rossa'];
  dataSource = new MatTableDataSource();
  criticalIssues = [
    {
      id: '1',
      name: 'Cambio di corsia illegale',
      c_green: false,
      c_yellow: false,
      c_orange: false,
      c_red: false,
      d_green: false,
      d_yellow: false,
      d_orange: false,
      d_red: false
    },
    {
      id: '2',
      name: 'Traffico congestionato',
      c_green: false,
      c_yellow: false,
      c_orange: false,
      c_red: false,
      d_green: false,
      d_yellow: false,
      d_orange: false,
      d_red: false
    },
    {
      id: '3',
      name: 'Oggetto o persona in strada',
      c_green: false,
      c_yellow: false,
      c_orange: false,
      c_red: false,
      d_green: false,
      d_yellow: false,
      d_orange: false,
      d_red: false
    },
    {
      id: '4',
      name: 'Invasione di area pedonale',
      c_green: false,
      c_yellow: false,
      c_orange: false,
      c_red: false,
      d_green: false,
      d_yellow: false,
      d_orange: false,
      d_red: false
    },
    {
      id: '5',
      name: 'Possibile incidente',
      c_green: false,
      c_yellow: false,
      c_orange: false,
      c_red: false,
      d_green: false,
      d_yellow: false,
      d_orange: false,
      d_red: false
    },
    {
      id: '6',
      name: 'Veicolo in sosta vietata',
      c_green: false,
      c_yellow: false,
      c_orange: false,
      c_red: false,
      d_green: false,
      d_yellow: false,
      d_orange: false,
      d_red: false
    }
  ];
  timerForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel,
    private safeSpotter: SafespotterService,
    private toastr: ToastrService,
    public formBuilder: FormBuilder
  ) {
  }

  async ngOnInit() {
    this.initializeSlider(this.data);
    this.dataSource = new MatTableDataSource(this.criticalIssues);
    this.initializeTimers(this.data);
    this.dataSource.data.unshift({id: '0'});

  }

  initializeTimers(data) {

    const timers = data.timers;

    this.timerForm = this.formBuilder.group({
      timer_green: [this.convertMStoMin(timers[1].timer), Validators.compose([Validators.maxLength(3), Validators.pattern('^[0-9]*$'), Validators.required])],
      timer_yellow: [this.convertMStoMin(timers[2].timer), Validators.compose([Validators.maxLength(3), Validators.pattern('^[0-9]*$'), Validators.required])],
      timer_orange: [this.convertMStoMin(timers[3].timer), Validators.compose([Validators.maxLength(3), Validators.pattern('^[0-9]*$'), Validators.required])],
      timer_red: [this.convertMStoMin(timers[4].timer), Validators.compose([Validators.maxLength(3), Validators.pattern('^[0-9]*$'), Validators.required])]
    });
  }

  initializeSlider(data) {

    const config = data.configuration;

    for (let ci of this.criticalIssues) {
      for (let el of config) {
        if (ci.id == el.alert_id) {
          switch (el.configuration_type) {
            case '4': //notifica rossa
              ci.c_green = true;
              ci.c_yellow = true;
              ci.c_orange = true;
              ci.c_red = true;
              ci.d_green = true;
              ci.d_yellow = true;
              ci.d_orange = true;
              ci.d_red = false;
              break;
            case '3': //notifica arancione
              ci.c_green = true;
              ci.c_yellow = true;
              ci.c_orange = true;
              ci.c_red = false;
              ci.d_green = true;
              ci.d_yellow = true;
              ci.d_orange = false;
              ci.d_red = false;
              break;
            case '2': //notifica gialla
              ci.c_green = true;
              ci.c_yellow = true;
              ci.c_orange = false;
              ci.c_red = false;
              ci.d_green = true;
              ci.d_yellow = false;
              ci.d_orange = false;
              ci.d_red = false;
              break;
            case '1': //notifica verde
              ci.c_green = true;
              ci.c_yellow = false;
              ci.c_orange = false;
              ci.c_red = false;
              ci.d_green = false;
              ci.d_yellow = false;
              ci.d_orange = false;
              ci.d_red = false;
              break;
            default: //nessuna notifica
              ci.c_green = false;
              ci.c_yellow = false;
              ci.c_orange = false;
              ci.c_red = false;
              ci.d_green = false;
              ci.d_yellow = false;
              ci.d_orange = false;
              ci.d_red = false;
              break;
          }
        }
      }
    }
  }

  convertMStoMin(time) {
    return time / 60000;
  }

  convertMintoMS(time) {
    return time * 60000;
  }

  convertKey(key) {

    switch (key) {
      case 'timer_green':
        return 1;
      case 'timer_yellow':
        return 2;
      case 'timer_orange':
        return 3;
      case 'timer_red':
        return 4;
    }
  }

  get f() {
    return this.timerForm.controls;
  }

  onSubmit() {
    const controls = this.timerForm.controls;
    Object.keys(controls).forEach(key => {

      if (this.timerForm.controls[key].touched) {

        this.safeSpotter.updateLamppostTimer(this.data.id, this.convertKey(key), this.convertMintoMS(this.timerForm.controls[key].value)).subscribe(
          result => {
            this.timerForm.controls[key].markAsUntouched();
            return this.toastr.info('Timer aggiornati con successo', 'SALVATO!', {timeOut: 2000});
          }
        );

      }
    });

  }

  public async onToggle(event: MatSlideToggleChange, lampId, element, alertColor) {

    //nessuna notifica -> 0
    //notifica verde   -> 1
    //notifica gialla  -> 2
    //notifica arancio -> 3
    //notifica rossa   -> 4

    const confType = {no_type: '0', green: '1', yellow: '2', orange: '3', red: '4'};
    const alertId = element.id;

    if (alertColor === 'red' && event.checked) {
      element.c_green = true;
      element.c_yellow = true;
      element.c_orange = true;
      element.c_red = true;
      element.d_green = true;
      element.d_yellow = true;
      element.d_orange = true;
      element.d_red = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.red).toPromise();
      this.toastr.info('Configurazione aggiornata con successo', 'SALVATO!', {timeOut: 2000});
    }

    if (alertColor === 'red' && !event.checked) {
      element.c_green = true;
      element.c_yellow = true;
      element.c_orange = true;
      element.c_red = false;
      element.d_green = true;
      element.d_yellow = true;
      element.d_orange = false;
      element.d_red = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.orange).toPromise();
      this.toastr.info('Configurazione aggiornata con successo', 'SALVATO!', {timeOut: 2000});
    }

    if (alertColor === 'orange' && event.checked) {
      element.c_green = true;
      element.c_yellow = true;
      element.c_orange = true;
      element.c_red = false;
      element.d_green = true;
      element.d_yellow = true;
      element.d_orange = false;
      element.d_red = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.orange).toPromise();
      this.toastr.info('Configurazione aggiornata con successo', 'SALVATO!', {timeOut: 2000});
    }

    if (alertColor === 'orange' && !event.checked) {
      element.c_green = true;
      element.c_yellow = true;
      element.c_orange = false;
      element.c_red = false;
      element.d_green = true;
      element.d_yellow = false;
      element.d_orange = false;
      element.d_red = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.yellow).toPromise();
      this.toastr.info('Configurazione aggiornata con successo', 'SALVATO!', {timeOut: 2000});
    }

    if (alertColor === 'yellow' && event.checked) {
      element.c_green = true;
      element.c_yellow = true;
      element.c_orange = false;
      element.c_red = false;
      element.d_green = true;
      element.d_yellow = false;
      element.d_orange = false;
      element.d_red = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.yellow).toPromise();
      this.toastr.info('Configurazione aggiornata con successo', 'SALVATO!', {timeOut: 2000});
    }

    if (alertColor === 'yellow' && !event.checked) {
      element.c_green = true;
      element.c_yellow = false;
      element.c_orange = false;
      element.c_red = false;
      element.d_green = false;
      element.d_yellow = false;
      element.d_orange = false;
      element.d_red = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.green).toPromise();
      this.toastr.info('Configurazione aggiornata con successo', 'SALVATO!', {timeOut: 2000});
    }

    if (alertColor === 'green' && event.checked) {
      element.c_green = true;
      element.c_yellow = false;
      element.c_orange = false;
      element.c_red = false;
      element.d_green = false;
      element.d_yellow = false;
      element.d_orange = false;
      element.d_red = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.green).toPromise();
      this.toastr.info('Configurazione aggiornata con successo', 'SALVATO!', {timeOut: 2000});
    }

    if (alertColor === 'green' && !event.checked) {
      element.c_green = false;
      element.c_yellow = false;
      element.c_orange = false;
      element.c_red = false;
      element.d_green = false;
      element.d_yellow = false;
      element.d_orange = false;
      element.d_red = false;
      this.safeSpotter.updateLamppostConfiguration(lampId, alertId, confType.no_type).toPromise();
      this.toastr.info('Configurazione aggiornata con successo', 'SALVATO!', {timeOut: 2000});
    }

  }
}


