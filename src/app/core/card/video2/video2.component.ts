import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import JSMpeg from 'jsmpeg-player';

@Component({
  selector: 'app-video2',
  templateUrl: './video2.component.html',
  styleUrls: ['./video2.component.scss']
})

export class Video2Component implements OnInit, AfterViewInit {
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
    let player2 = new JSMpeg.Player ('ws://localhost:9998', {canvas: document.getElementById('canvas2'), autoplay: true, audio: false, loop: true})
    console.log(this.streamingcanvas);
  }


}

