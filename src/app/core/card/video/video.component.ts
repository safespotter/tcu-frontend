import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatVideoComponent} from 'mat-video/lib/video.component';
import JSMpeg from 'jsmpeg-player';
import {ONVIFService} from 'onvif-rx-angular';
import {DataService} from '../../../shared/_services/data.service';
import {MatSelect} from '@angular/material/select';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';


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

  constructor(
    private renderer: Renderer2,
    private datasev: DataService,
    private modalService: BsModalService,
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

  decline = (): void => {
    this.modalRef.hide();
  }

  getIndexFromId(id) {
    return this.safeList.findIndex(obj => obj.id === parseInt(id,10));
  }
}
