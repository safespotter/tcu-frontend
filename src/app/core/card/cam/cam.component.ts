import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../../shared/_services/data.service';
import JSMpeg from 'jsmpeg-player';

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.scss']
})
export class CamComponent implements OnInit {

  // @ViewChild('streaming', {static: false}) streamingcanvas: ElementRef;
  @Input() isLampDataReady;
  lamp_id;
  lamp_data;
  isVideoLoaded = false;

  constructor(private router: Router,
              private datasev: DataService) {
    this.lamp_id = this.router.getCurrentNavigation().extractedUrl.queryParams.cam;
  }

  ngOnInit(): void {
    this.getLampData();
    // const player = new JSMpeg.Player('rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov', {
    //   canvas: this.streamingcanvas, autoplay: true, audio: false, loop: true
    // });
  }

  getLampData() {
    const data = this.datasev.getData().subscribe(
      result => {
        for(const el of Object.values(result)){
          if (el.id == this.lamp_id){
            this.isLampDataReady = true;
            this.lamp_data = el;
            this.lamp_data.ip_cam_fix = this.lamp_data.ip_cam_fix + '/axis-cgi/mjpg/video.cgi?date=1&clock=1&resolution=1920x1080';
          }
        }
      }
    );
  }

}
