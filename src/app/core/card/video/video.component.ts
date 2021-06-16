import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
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
  }

  ngAfterViewInit() {
    this.matSelect.valueChange.subscribe(value => {
      this.selected = value;
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

  //Da eliminare quando si avrà il flusso video
  getImgSrc = (): string => {

    switch (this.selected) {
      case '1':
        return '/assets/img/im1.jpg';
      case '2':
        return '../../../../assets/img/im2.jpg';
      case '3':
        return '../../../../assets/img/im1.jpg';
      case '4':
        return '../../../../assets/img/im2.jpg';
      case '5':
        return '../../../../assets/img/im1.jpg';
      case '6':
        return '../../../../assets/img/im2.jpg';
      case '7':
        return '../../../../assets/img/im1.jpg';
      case '8':
        return '../../../../assets/img/im2.jpg';
      case '9':
        return '../../../../assets/img/im1.jpg';
      case '10':
        return '../../../../assets/img/im2.jpg';
      default:
        return '../../../../assets/img/im1.jpg';
    }
  }
}
