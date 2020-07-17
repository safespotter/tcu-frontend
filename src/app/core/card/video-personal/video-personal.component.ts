import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import JSMpeg from 'jsmpeg-player';
import {DataService} from '../../../shared/_services/data.service';
import {forkJoin} from "rxjs";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-video-personal',
  templateUrl: './video-personal.component.html',
  styleUrls: ['./video-personal.component.scss']
})
export class VideoPersonalComponent implements  OnInit, AfterViewInit {
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
    this.matSelect.valueChange.subscribe(value => {
      this.selected = value;
      const player2 = new JSMpeg.Player ('ws://localhost:9999', {canvas: document.getElementById('canvas3'), autoplay: true, audio: false, loop: true});
    });
  }


}

