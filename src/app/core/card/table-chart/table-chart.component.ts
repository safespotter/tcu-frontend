import {AfterViewInit, Component, Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {CustomComponent} from '../../../features/dashboard/custom/custom.component';
import {element} from 'protractor';
import {Info} from '../../../shared/_models/info.model';
import {SocketioService} from '../../../shared/_services/socketio.service';
import {timeout} from 'rxjs/operators';
import set = Reflect.set;
import {DataService} from '../../../shared/_services/data.service';
import {ActionRequestComponent} from '../action-request/action-request.component';
import {LamppostConfigurationComponent} from '../lamppost-configuration/lamppost-configuration.component';
import {LamppostConfiguration} from '../../../shared/_models/LamppostConfiguration';
import {SafespotterService} from '../../../shared/_services/safespotter.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'app-table-chart',
  templateUrl: './table-chart.component.html',
  styleUrls: ['./table-chart.component.scss']
})

export class TableChartComponent implements OnInit, AfterViewInit {

  @ViewChild('manualAlert') manualAlertModal: string;
  @ViewChild('prorogationAlert') prorogationAlertModal: string;
  @ViewChild('editAlert') editAlertModal: string;
  @ViewChild('propagateAlert') propagateAlertModal: string;

  @Input() isPanelReady;
  panelActualValue;

  @Input() isLampListReady;
  lampList = [];

  selectedLamp;
  platform = environment.platform;
  modalRef: BsModalRef;
  table = [];
  displayedColumns: string[];
  // dataSource = new MatTableDataSource<Info>(INFO_DATA);
  anomalyList: any;
  dataSource;
  tmp;
  grey = 0;
  flag = false;
  manualAlertForm: FormGroup;
  editAlertForm: FormGroup;
  prorogationAlertForm: FormGroup;
  propagateAlertForm: FormGroup;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Output() elementSelected = new EventEmitter<string>();

  constructor(
    public dialog: MatDialog,
    public dialogComponent: DialogComponent,
    public srv: SocketioService,
    public datasev: DataService,
    private safeSpotter: SafespotterService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,
    public formBuilder: FormBuilder
  ) {
    this.anomalyList = this.datasev.getAnomalyList();
  }

  ngOnInit() {

  }

  async ngAfterViewInit() {

    await this.srv.listen('dataUpdate').subscribe((res: any) => {
      this.tmp = res[0];
      this.tmp = this.tmp.filter(el => el.platform === this.platform);
      for (const el of this.tmp) {
        el.alert_name = this.datasev.convertAnomalies(el.alert_id);
        if (el.anomaly_level >= 3) {
          this.flag = true;
        }
      }

      this.flag ? this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'info', 'condition', 'alert', 'button', 'gear'] :
        this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'info', 'condition', 'button', 'gear'];
      // this.timerChamge();

      this.tmp.sort((a, b) => (a.anomaly_level > b.anomaly_level ? -1 : 1));

      this.dataSource = new MatTableDataSource<Info>(this.tmp);
      this.grey = res[1];
      this.dataSource.paginator = this.paginator;

    });
  }

  openDialog(info) {
    this.dialog.open(DialogComponent, {
      // height: '90%',
      maxWidth: '100vw',
      // maxHeight: '100vh',
      data: {
        anomaly_level: info.anomaly_level,
        alert_id: info.alert_id,
        id: info.id,
        street: info.street,
        lat: info.lat,
        long: info.long,
        date: info.date,
        ip_cam_fix: info.ip_cam_fix,
        ip_cam_brand: info.ip_cam_brand
      }
    });

  }

  convertAnomalyLevel(anomaly_level) {

    switch (anomaly_level) {
      case 0:
        return 'NESSUNA';
      case 1:
        return 'VERDE';
      case 2:
        return 'GIALLA';
      case 3:
        return 'ARANCIONE';
      case 4:
        return 'ROSSA';
    }
  }

  openDialogrequest(info) {
    this.dialog.open(ActionRequestComponent, {
      // height: '90%',
      maxWidth: '100vw',
      maxHeight: '95vh',
      data: {
        anomaly_level: info.anomaly_level,
        alert_id: info.alert_id,
        notification_id: info.notification_id,
        status_id: info.status_id,
        id: info.id,
        street: info.street,
        date: info.date,
        alert_name: this.datasev.convertAnomalies(info.alert_id),
        ip_cam_brand: info.ip_cam_brand,
        panel: info.panel
      }
    });
  }

  openCam(link) {
    window.open(link, '_blank');
  }

  openConfiguration(info: LamppostConfiguration) {

    this.safeSpotter.getLamppostConfiguration(info.id).subscribe(result => {
      const configuration = Object.values(result)[1];
      const timers = Object.values(result)[2];
      this.dialog.open(LamppostConfigurationComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        data: {
          condition: info.condition,
          critical_issues: info.critical_issues,
          info: info.street,
          id: info.id,
          street: info.street,
          position: info.position,
          condition_convert: info.condition_convert,
          configuration: configuration,
          timers: timers
        }
      });
    });
  }

  openEdit(id) {
    const host: string = location.origin;
    const url: string = host + '/#/' + String(this.router.createUrlTree(['edit_lamppost'], {queryParams: {'id': id}}));
    window.open(url, '_blank');

  }

  getValueFromClick($event) {

    this.elementSelected.emit(Object(Object($event)));

  }

  openManualAlertModal(modal, lamp_id) {
    this.modalRef = this.modalService.show(modal,
      {
        class: 'modal-sm modal-dialog-centered',
        keyboard: false,
        backdrop: 'static'
      });

    this.safeSpotter.getPanelsStatus(lamp_id).subscribe(res => {
      this.isPanelReady = true;
      this.panelActualValue = Object.values(res)[2];
    });

    this.manualAlertForm = this.formBuilder.group({
      lamp_id: lamp_id,
      alert_id: [Validators.required],
      anomaly_level: [Validators.required],
      panel: [Validators.required],
      telegram: false,
      timer: [15, Validators.compose([Validators.pattern('^[1-9]\\d*(\\.\\d+)?$'), Validators.required])]
    });
  }

  openEditAlertModal(modal, lamp_id, notification_id, status_id) {
    this.modalRef = this.modalService.show(modal,
      {
        class: 'modal-sm modal-dialog-centered',
        keyboard: false,
        backdrop: 'static'
      });

    this.safeSpotter.getPanelsStatus(lamp_id).subscribe(res => {
      this.isPanelReady = true;
      this.panelActualValue = Object.values(res)[2];
    });

    this.editAlertForm = this.formBuilder.group({
      notification_id: notification_id,
      status_id: status_id,
      lamp_id: lamp_id,
      alert_id: [Validators.required],
      anomaly_level: [Validators.required],
      panel: [Validators.required],
      telegram: false,
      timer: [15, Validators.compose([Validators.pattern('^[1-9]\\d*(\\.\\d+)?$'), Validators.required])]
    });
  }

  openProrogationAlertModal(modal, lamp_id) {
    this.modalRef = this.modalService.show(modal,
      {
        class: 'modal-sm modal-dialog-centered',
        keyboard: false,
        backdrop: 'static'
      });

    this.prorogationAlertForm = this.formBuilder.group({
      lamp_id: lamp_id,
      timer: [15, Validators.compose([Validators.pattern('^[1-9]\\d*(\\.\\d+)?$'), Validators.required])]
    });
  }

  openPropagateAlertModal(modal, lamp_id, alert_id, anomaly_level, street) {
    this.modalRef = this.modalService.show(modal,
      {
        class: 'modal-sm modal-dialog-centered',
        keyboard: false,
        backdrop: 'static'
      });

    this.safeSpotter.getLampList().subscribe(res => {
      this.isLampListReady = true;
      for (const lamp of Object.values(res)) {
        if (lamp['platform'] === this.platform && lamp['id'] !== lamp_id) {
          this.safeSpotter.getPanelsStatus(lamp['id']).subscribe(res => {
            const panelValue = Object.values(res)[2];
            this.lampList.push({
              lamp_id: lamp['id'],
              street: lamp['street'],
              panel: lamp['panel'],
              panel_value: panelValue,
            });
          });
        }
      }
    });
    this.propagateAlertForm = this.formBuilder.group({
      lamp_id: lamp_id,
      street: street,
      alert_id: alert_id,
      anomaly_level: anomaly_level,
      panel: 0,
      timer: [15, Validators.compose([Validators.pattern('^[1-9]\\d*(\\.\\d+)?$'), Validators.required])],
      dest_lamp: []
    });
  }

  manualAlertSubmit() {
    let panel = 0;

    if (this.manualAlertForm.value.anomaly_level > 1) {
      panel = this.manualAlertForm.value.panel;
    }

    const body = {
      lamp_id: this.manualAlertForm.value.lamp_id,
      alert_id: this.manualAlertForm.value.alert_id,
      anomaly_level: this.manualAlertForm.value.anomaly_level,
      panel: panel,
      timer: this.manualAlertForm.value.timer * 60000,
      telegram: this.manualAlertForm.value.telegram
    };

    if (this.manualAlertForm.controls.alert_id.status != 'INVALID' && this.manualAlertForm.controls.anomaly_level.status != 'INVALID' &&
      this.manualAlertForm.controls.panel.status != 'INVALID' && this.manualAlertForm.controls.timer.status != 'INVALID') {
      this.safeSpotter.manualAlert(body).subscribe(() => {
        this.toastr.info('', 'Allerta segnalata con successo');
        this.modalRef.hide();
        this.lampList = [];
        this.panelActualValue = null;
      }, error => {
        this.toastr.error('Errore imprevisto', 'Errore');
      });
    } else {
      this.toastr.warning('Completa tutti i campi obbligatori', 'Attenzione');
    }
  }

  editAlertSubmit() {

    let panel = 0;

    if (this.editAlertForm.value.anomaly_level > 1) {
      panel = this.editAlertForm.value.panel;
    }

    const body = {
      lamp_id: this.editAlertForm.value.lamp_id,
      notification_id: this.editAlertForm.value.notification_id,
      status_id: this.editAlertForm.value.status_id,
      alert_id: this.editAlertForm.value.alert_id,
      anomaly_level: this.editAlertForm.value.anomaly_level,
      panel: panel,
      timer: this.editAlertForm.value.timer * 60000,
      telegram: this.editAlertForm.value.telegram
    };

    if (this.editAlertForm.controls.alert_id.status != 'INVALID' && this.editAlertForm.controls.anomaly_level.status != 'INVALID' &&
      this.editAlertForm.controls.panel.status != 'INVALID' && this.editAlertForm.controls.timer.status != 'INVALID') {
      this.safeSpotter.editAlert(body).subscribe(() => {
        this.toastr.info('', 'Allerta modificata con successo');
        this.modalRef.hide();
        this.lampList = [];
        this.panelActualValue = null;
      }, error => {
        this.toastr.error('Errore imprevisto', 'Errore');
      });
    } else {
      this.toastr.warning('Completa tutti i campi obbligatori', 'Attenzione');
    }
  }

  propagationAlertSubmit() {
    const body = {
      lamp_id: this.propagateAlertForm.value.lamp_id,
      timer: this.propagateAlertForm.value.timer * 60000,
      alert_id: this.propagateAlertForm.value.alert_id,
      anomaly_level: this.propagateAlertForm.value.anomaly_level,
      panel: parseInt(this.propagateAlertForm.value.panel),
      dest_lamp: [this.propagateAlertForm.value.dest_lamp]
    };

    console.log("body", body);

    if (this.propagateAlertForm.controls.timer.status != 'INVALID') {
      this.safeSpotter.propagateAlert(body).subscribe(() => {
        this.toastr.info('', 'Allerta propagata con successo');
        this.modalRef.hide();
        this.lampList = [];
        this.panelActualValue = null;
      }, error => {
        this.toastr.error('Errore imprevisto', 'Errore');
      });
    } else {
      this.toastr.warning('Campi obbligatori', 'Attenzione');
    }
  }

  prorogationAlertSubmit() {
    const body = {
      lamp_id: this.prorogationAlertForm.value.lamp_id,
      timer: this.prorogationAlertForm.value.timer * 60000,
    };

    if (this.prorogationAlertForm.controls.timer.status != 'INVALID') {
      this.safeSpotter.prorogationAlert(body).subscribe(() => {
        this.toastr.info('', 'Allerta prorogata con successo');
        this.modalRef.hide();
        this.lampList = [];
        this.panelActualValue = null;
      }, error => {
        this.toastr.error('Errore imprevisto', 'Errore');
      });
    } else {
      this.toastr.warning('Campo timer obbligatorio', 'Attenzione');
    }
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

  selectChangeHandler (event: any) {
    this.safeSpotter.getPanelsStatus(this.propagateAlertForm.value['dest_lamp']).subscribe(res => {
      this.isPanelReady = true;
      this.panelActualValue = Object.values(res)[2];
    });
  }

  closeModal() {
    this.modalRef.hide();
    this.lampList = [];
    this.panelActualValue = null;
  }
}


