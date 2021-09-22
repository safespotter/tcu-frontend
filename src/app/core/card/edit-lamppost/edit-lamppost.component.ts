import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../shared/_services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SafespotterService} from '../../../shared/_services/safespotter.service';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-lamppost',
  templateUrl: './edit-lamppost.component.html',
  styleUrls: ['./edit-lamppost.component.scss']
})
export class EditLamppostComponent implements OnInit {

  @Input() isLampDataReady;
  @ViewChild('delete') deletemodal: string;
  lamp_id;
  lamp_data;
  lampForm: FormGroup;
  submitted = false;
  flagLamp = false;
  modalRef: BsModalRef;

  constructor(
    private router: Router,
    private datasev: DataService,
    private fb: FormBuilder,
    private safeSpotterService: SafespotterService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {
    this.lamp_id = this.router.getCurrentNavigation().extractedUrl.queryParams.id;

  }

  ngOnInit(): void {
    this.getLampData();
  }

  getLampData() {
    const data = this.datasev.getData().subscribe(
      result => {
        for (const el of Object.values(result)) {
          if (el.id == this.lamp_id) {
            this.isLampDataReady = true;
            this.lamp_data = el;
            this.lampForm = this.fb.group({
              street: [this.lamp_data.street, Validators.required],
              latitude: [this.lamp_data.lat, Validators.compose([Validators.pattern('^[1-9]\\d*(\\.\\d+)?$'), Validators.required])],
              longitude: [this.lamp_data.long, Validators.compose([Validators.pattern('^[1-9]\\d*(\\.\\d+)?$'), Validators.required])],
              ip_cam_fix: [this.lamp_data.ip_cam_fix, Validators.required],
              ip_cam_brand: [this.lamp_data.ip_cam_brand, Validators.required]
            });
          }
        }
      }
    );

  }

  get f() {
    return this.lampForm.controls;
  }

  onSubmit() {

    this.submitted = true;

    const street = this.lampForm.controls.street.value;
    const latitude = this.lampForm.controls.latitude.value;
    const longitude = this.lampForm.controls.longitude.value;
    const ip_cam_fix = this.lampForm.controls.ip_cam_fix.value;
    const ip_cam_brand = this.lampForm.controls.ip_cam_brand.value;

    const body = {
      lamp_id: this.lamp_id,
      street: street,
      lat: latitude,
      long: longitude,
      ip_cam_fix: ip_cam_fix,
      ip_cam_brand: ip_cam_brand
    };

    if (this.lampForm.controls.street.status != 'INVALID' && this.lampForm.controls.latitude.status != 'INVALID' && this.lampForm.controls.longitude.status != 'INVALID' && this.lampForm.controls.ip_cam_fix.status != 'INVALID' && this.lampForm.controls.ip_cam_brand.status != 'INVALID') {
      this.safeSpotterService.updateLamppost(body).subscribe(
        data => {
          this.submitted = false;

          this.toastr.info('', 'Lampione con id ' + this.lamp_id + ' modificato con successo.');

        }, error => {
          this.toastr.error('Errore imprevisto durante la modifica ', 'Modifica non riuscita');
        }
      );

    }
    else {
      this.toastr.warning('Verifica i dati inseriti.', 'Attenzione');
    }


  }

  toogleDelete($event) {
    this.flagLamp = !this.flagLamp;
  }

  removeLamp() {
    this.safeSpotterService.deleteLamppost(this.lamp_id).subscribe(
      data => {

        this.modalRef.hide();
        this.toastr.info('', 'Lampione con id ' + this.lamp_id + ' cancellato con successo.');
        //aggiungere loading

        setTimeout(() => {
          window.close();
        }, 5000);

      }, error => {
        this.toastr.error('Errore imprevisto durante la cancellazione ', 'Cancellazione non riuscita');
      }
    );

  }

  openModal(modal) {
    this.modalRef = this.modalService.show(modal,
      {
        class: 'modal-lg modal-dialog-centered',
        keyboard: false
      });
  }

  closeModal() {
    this.modalRef.hide();
  }

}
