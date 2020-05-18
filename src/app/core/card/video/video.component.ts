import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatVideoComponent} from 'mat-video/lib/video.component';
import JSMpeg from 'jsmpeg-player';
import { ONVIFService } from 'onvif-rx-angular';
import {DataService} from '../../../shared/_services/data.service';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit {
  // @ViewChild('video') matVideo: MatVideoComponent;
  @ViewChild('streaming') streamingcanvas: ElementRef;
  @ViewChild('matSelect') matSelect: MatSelect;

  // video: HTMLVideoElement;

  title: string;
  selected = '';
  safeList: any;
  constructor(
    private renderer: Renderer2,
    private datasev: DataService,
  ) {

  }

  async ngOnInit() {
    this.safeList = await this.datasev.getData().toPromise();
  }

  ngAfterViewInit() {
    const player = new JSMpeg.Player ('ws://localhost:9999', {canvas: document.getElementById('canvas'), autoplay: true, audio: false, loop: true});
    this.matSelect.valueChange.subscribe(value => {
      console.log(value);
    });
  }


}
