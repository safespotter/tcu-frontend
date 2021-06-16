import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.scss']
})
export class CamComponent implements OnInit {

  constructor(private router: Router) {
    console.log(this.router.getCurrentNavigation().extractedUrl.queryParams.cam);
  }

  ngOnInit(): void {

  }

}
