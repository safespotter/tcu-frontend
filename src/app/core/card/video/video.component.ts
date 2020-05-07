import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatVideoComponent} from 'mat-video/lib/video.component';
import JSMpeg from 'jsmpeg-player';
import { ONVIFService } from 'onvif-rx-angular';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit {
  // @ViewChild('video') matVideo: MatVideoComponent;
  @ViewChild('streaming') streamingcanvas: ElementRef;

  // video: HTMLVideoElement;

  title: string;
  constructor(
    private renderer: Renderer2,
  ) { }

  ngOnInit(){
    console.log('prima');




    // try {
    //   this.video = this.matVideo.getVideoTag();
    //   // Use Angular renderer or addEventListener to listen for standard HTML5 video events
    //
    //   this.renderer.listen(this.video, 'ended', () => console.log('video ended'));
    //   this.video.addEventListener('ended', () => console.log('video ended'));
    // } catch (e) {
    //   console.error(e);
    // }
  }

  ngAfterViewInit() {
    let player = new JSMpeg.Player ('ws://localhost:9999', {canvas: document.getElementById('canvas'), autoplay: true, audio: false, loop: true})
    console.log(this.streamingcanvas);
  }


}
