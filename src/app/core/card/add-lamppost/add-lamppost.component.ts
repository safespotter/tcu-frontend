import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SafespotterService} from '../../../shared/_services/safespotter.service';
import {ToastrService} from 'ngx-toastr';
import {error} from 'selenium-webdriver';

@Component({
  selector: 'app-add-lamppost',
  templateUrl: './add-lamppost.component.html',
  styleUrls: ['./add-lamppost.component.scss']
})
export class AddLamppostComponent implements OnInit {

  lampForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private safeSpotterService: SafespotterService,
    private toastr: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit(): void {

  }

  get f() {
    // console.log('f', this.lampForm.controls)
    return this.lampForm.controls;
  }

  createForm() {
    this.lampForm = this.fb.group({
      street: ['', Validators.required],
      latitude: ['', Validators.compose([Validators.pattern('^[1-9]\\d*(\\.\\d+)?$'), Validators.required])],
      longitude: ['', Validators.compose([Validators.pattern('^[1-9]\\d*(\\.\\d+)?$'), Validators.required])],
      ip_cam_fix: ['', Validators.required],
      ip_cam_brand: ['', Validators.required]
    });
  }

  onSubmit() {

    this.submitted = true;

    const street = this.lampForm.controls.street.value;
    const latitude = this.lampForm.controls.latitude.value;
    const longitude = this.lampForm.controls.longitude.value;
    const ip_cam_fix = this.lampForm.controls.ip_cam_fix.value;
    const ip_cam_brand = this.lampForm.controls.ip_cam_brand.value;

    const body = {
      street: street,
      lat: latitude,
      long: longitude,
      ip_cam_fix: ip_cam_fix,
      ip_cam_brand: ip_cam_brand
    };

    if (this.lampForm.controls.street.status != 'INVALID' && this.lampForm.controls.latitude.status != 'INVALID' && this.lampForm.controls.longitude.status != 'INVALID' && this.lampForm.controls.ip_cam_fix.status != 'INVALID' && this.lampForm.controls.ip_cam_brand.status != 'INVALID') {
      this.safeSpotterService.createLamppost(body).subscribe(
        data => {
          this.submitted = false;
          this.lampForm.controls.street.setValue('');
          this.lampForm.controls.latitude.setValue('');
          this.lampForm.controls.longitude.setValue('');
          this.lampForm.controls.ip_cam_fix.setValue('');
          this.lampForm.controls.ip_cam_brand.setValue('');
          this.toastr.info('', 'Lampione con id ' + Object.values(data)[0] + ' inserito con successo.');

        }, error => {
          this.toastr.error('Errore imprevisto durante l\'inserimento ', 'Inserimento non riuscito');
        }
      );
    }
    else {
      this.toastr.warning('Verifica i dati inseriti.', 'Attenzione');
    }


  }

}
