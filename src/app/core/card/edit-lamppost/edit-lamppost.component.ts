import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../shared/_services/data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-lamppost',
  templateUrl: './edit-lamppost.component.html',
  styleUrls: ['./edit-lamppost.component.scss']
})
export class EditLamppostComponent implements OnInit {

  @Input() isLampDataReady;
  lamp_id;
  lamp_data;
  lampForm: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private datasev: DataService,
    private fb: FormBuilder
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

}
