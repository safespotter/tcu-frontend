import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import JSMpeg from 'jsmpeg-player';
import {DataService} from '../../../shared/_services/data.service';
import {forkJoin} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-video2',
  templateUrl: './video2.component.html',
  styleUrls: ['./video2.component.scss']
})

export class Video2Component implements OnInit, AfterViewInit {
  // @ViewChild('video') matVideo: MatVideoComponent;
  @ViewChild('streaming') streamingcanvas: ElementRef;
  @ViewChild('matSelect') matSelect: MatSelect;
  @ViewChild('mymodal') mymodal: string;

  // video: HTMLVideoElement;

  title: string;
  selected: string;
  safeList: any;
  modalRef: BsModalRef;

  @Input() isLampDataReady;
  lamp_data;

  constructor(
    private renderer: Renderer2,
    private datasev: DataService,
    private modalService: BsModalService,
    private router: Router
  ) {

  }

  async ngOnInit() {
    this.safeList = await this.datasev.getData().toPromise();
    this.selected = this.safeList[1].id.toString(); // il secondo della lista
    this.getLampData();
  }

  ngAfterViewInit() {

    this.matSelect.valueChange.subscribe(value => {
      this.selected = value;
      this.getLampData();
      // const player2 = new JSMpeg.Player ('ws://localhost:9999', {canvas: document.getElementById('canvas2'), autoplay: true, audio: false, loop: true});
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
            console.log("this.lamp data_2", this.lamp_data);
          }
        }
      }
    );
  }
}

