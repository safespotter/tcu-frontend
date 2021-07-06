import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatVideoComponent} from 'mat-video/lib/video.component';
import JSMpeg from 'jsmpeg-player';
import {ONVIFService} from 'onvif-rx-angular';
import {DataService} from '../../../shared/_services/data.service';
import {MatSelect} from '@angular/material/select';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';


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

  // video: HTMLVideoElement;
  modalRef: BsModalRef;
  title: string;
  selected: string;
  safeList: any;

  @Input() isLampDataReady;
  lamp_data;

  formatUrl = environment.protocol + environment.host + ':' + environment.port;

  constructor(
    private renderer: Renderer2,
    private datasev: DataService,
    private modalService: BsModalService,
    private router: Router
  ) {

  }

  async ngOnInit() {
    this.safeList = await this.datasev.getData().toPromise();
    this.selected = this.safeList[0].id.toString(); // il primo nella lista
    this.getLampData();
  }

  ngAfterViewInit() {
    this.matSelect.valueChange.subscribe(value => {
      this.selected = value;
      this.getLampData();
      //console.log('value selected ', value);
      //   const player = new JSMpeg.Player ('ws://localhost:9999', {canvas: document.getElementById('canvas'), autoplay: true, audio: false, loop: true});
    });
  }

  openModal(modal) {
    this.modalRef = this.modalService.show(modal,
      {
        class: 'modal-lg modal-dialog-centered',
        keyboard: false
      });
  }

  openCamStream(){
    const host: string =  location.origin;
    const url: string = host + '/#/' + String(this.router.createUrlTree(['cam'], { queryParams: { cam: this.selected }}));
    window.open(url, '_blank');
  }

  decline = (): void => {
    this.modalRef.hide();
  }

  getIndexFromId(id) {
    return this.safeList.findIndex(obj => obj.id === parseInt(id, 10));
  }

  getLampData() {
    const data = this.datasev.getData().subscribe(
      result => {
        for(const el of Object.values(result)){
          if (el.id == this.selected){
            this.isLampDataReady = true;
            this.lamp_data = el;
            this.lamp_data.ip = this.lamp_data.ip + '/axis-cgi/mjpg/video.cgi?date=1&clock=1&resolution=1920x1080';
            console.log("this.lamp data_1", this.lamp_data);
          }
        }
      }
    );
  }
}
