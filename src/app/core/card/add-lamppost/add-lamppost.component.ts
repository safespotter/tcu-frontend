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
    return this.lampForm.controls;
  }

  createForm() {
    this.lampForm = this.fb.group({
      street: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
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

    if (street.length > 0 && latitude.length > 0 && longitude.length > 0 && ip_cam_fix.length > 0 && ip_cam_brand.length > 0) {
      this.safeSpotterService.createLamppost(body).subscribe(
        data => {
          this.submitted = false;
          this.lampForm.controls.street.setValue('');
          this.lampForm.controls.latitude.setValue('');
          this.lampForm.controls.longitude.setValue('');
          this.lampForm.controls.ip_cam_fix.setValue('');
          this.lampForm.controls.ip_cam_brand.setValue('');
          this.toastr.info('', 'Nuovo lampione inserito con successo');

        }, error => {
          this.toastr.error('Errore imprevisto durante l\'inserimento ', 'Inserimento non riuscito');
        }
      );
    }
    else {
      this.toastr.warning('Verifica i dati inseriti', 'Attenzione');
    }


  }

}
