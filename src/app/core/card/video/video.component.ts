import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatVideoComponent} from 'mat-video/lib/video.component';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @ViewChild('video') matVideo: MatVideoComponent;
  video: HTMLVideoElement;

  title: string;
  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {

    this.title = 'video';
    console.log(this.title);
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

}
