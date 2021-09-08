import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SafespotterService} from '../../../shared/_services/safespotter.service';

@Component({
  selector: 'app-add-lamppost',
  templateUrl: './add-lamppost.component.html',
  styleUrls: ['./add-lamppost.component.scss']
})
export class AddLamppostComponent implements OnInit {

  lampForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private safeSpotterService: SafespotterService
  ) {
    this.createForm();
  }

  ngOnInit(): void {

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

  createLamppost() {
    const street = this.lampForm.controls.street.value;
    const latitude = this.lampForm.controls.latitude.value;
    const longitude = this.lampForm.controls.longitude.value;
    const ip_cam_fix = this.lampForm.controls.ip_cam_fix.value;
    const ip_cam_brand = this.lampForm.controls.ip_cam_brand.value;

    const body = {
      street: street,
      latitude: latitude,
      longitude: longitude,
      ip_cam_fix: ip_cam_fix,
      ip_cam_brand: ip_cam_brand
    };

    console.log("street: ", street);

    // this.safeSpotterService.createLamppost(body).subscribe(
    //   //ricevere messaggio da api
    //
    // );

  }

}
