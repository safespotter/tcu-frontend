import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import JSMpeg from 'jsmpeg-player';
import {DataService} from '../../../shared/_services/data.service';
import {forkJoin} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

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

  constructor(
    private renderer: Renderer2,
    private datasev: DataService,
    private modalService: BsModalService,
  ) {

  }

  async ngOnInit() {
    this.safeList = await this.datasev.getData().toPromise();
    this.selected = this.safeList[1].id.toString(); // il secondo della lista
  }

  ngAfterViewInit() {

    this.matSelect.valueChange.subscribe(value => {
      this.selected = value;
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

  decline = (): void => {
    this.modalRef.hide();
  }

  getIndexFromId(id) {
    return this.safeList.findIndex(obj => obj.id === parseInt(id, 10));
  }

}

