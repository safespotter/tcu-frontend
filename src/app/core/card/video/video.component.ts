import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatVideoComponent} from 'mat-video/lib/video.component';
import JSMpeg from 'jsmpeg-player';
import {ONVIFService} from 'onvif-rx-angular';
import {DataService} from '../../../shared/_services/data.service';
import {MatSelect} from '@angular/material/select';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit {
  // @ViewChild('video') matVideo: MatVideoComponent;
  @ViewChild('streaming') streamingcanvas: ElementRef;
  @ViewChild('matSelect') matSelect: MatSelect;
  @ViewChild('mymodal') mymodal: string;

  // url: string = "https://aircam.io/cam/piazza-yenne-cagliari";
  // urlSafe: SafeResourceUrl;
  // video: HTMLVideoElement;
  modalRef: BsModalRef;
  title: string;
  selected: string;
  safeList: any;
  isVideoLoaded = false;

  @Input() isLampDataReady;
  lamp_data;

  @Input() receivedFromMap;

  formatUrl = environment.protocol + environment.host + ':' + environment.port;

  constructor(
    private renderer: Renderer2,
    private datasev: DataService,
    private modalService: BsModalService,
    private router: Router,
    public sanitizer: DomSanitizer
  ) {

  }

  async ngOnInit() {
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.safeList = await this.datasev.getData().toPromise();
    this.selected = this.safeList[0].id.toString(); // il primo nella lista
    this.getLampData();
  }

  ngAfterViewInit() {
    // this.matSelect.valueChange.subscribe(value => {
    //   this.selected = value;
    //   this.getLampData();
    //   //console.log('value selected ', value);
    //   //   const player = new JSMpeg.Player ('ws://localhost:9999', {canvas: document.getElementById('canvas'), autoplay: true, audio: false, loop: true});
    // });
  }

  openModal(modal) {
    this.modalRef = this.modalService.show(modal,
      {
        class: 'modal-lg modal-dialog-centered',
        keyboard: false
      });
  }

  openCamStream(received) {
    const host: string = location.origin;
    const url: string = host + '/#/' + String(this.router.createUrlTree(['cam'], {queryParams: {cam: received}}));
    window.open(url, '_blank');
  }

  getIndexFromId(id) {
    return this.safeList.findIndex(obj => obj.id === parseInt(id, 10));
  }

  combineUrl(str1) {
    return str1 + 'axis-cgi/mjpg/video.cgi?date=1&clock=1&resolution=640x360';
  }

  closeVideo(){
    this.receivedFromMap = null;
    this.isVideoLoaded = false;
  }


  getLampData() {
    const data = this.datasev.getData().subscribe(
      result => {
        for (const el of Object.values(result)) {
          if (el.id == this.selected) {
            this.isLampDataReady = true;
            this.lamp_data = el;
            this.lamp_data.ip_cam_fix = this.lamp_data.ip_cam_fix + '/axis-cgi/mjpg/video.cgi?date=1&clock=1&resolution=640x360';
          }
        }
      }
    );
  }
}
