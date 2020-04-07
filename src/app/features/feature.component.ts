import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ngxLoadingAnimationTypes} from "ngx-loading";
import {GlobalEventsManagerService} from "../shared/_services/global-event-manager.service";

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  //styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  public config = {
    animationType: ngxLoadingAnimationTypes.threeBounce,
    backdropBackgroundColour: 'rgba(0,0,0,0.1)',
    backdropBorderRadius: '4px',
    primaryColour: '#FFF',
    secondaryColour: '#FFF'
  };

  constructor(
    private GEservice: GlobalEventsManagerService,
    private host: ElementRef,
    private renderer: Renderer2) {

  }
  loading = true;
  drag: boolean;

  ngOnInit() {
    this.GEservice.loadingScreen.subscribe(value => this.loading = value);
    this.GEservice.dragAndDrop.subscribe(value => this.drag = value);

    if (this.drag) {
      this.renderer.setStyle(this.host.nativeElement, 'background-color', 'rgb(210, 209, 209)');
    }

  }

}
