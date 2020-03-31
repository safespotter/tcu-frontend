import { Component, OnInit } from '@angular/core';
import {GlobalEventsManagerService} from "../../shared/_services/global-event-manager.service";
import {TranslateService} from "@ngx-translate/core";
import {User} from "../../shared/_models/User";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  copyrightYear = new Date().getFullYear();
  drag: boolean;

  isUserLoggedIn = false;

  lang: string;
  value: string;
  tmp: string;
  user: User;

  constructor(
    private GEservice: GlobalEventsManagerService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.GEservice.dragAndDrop.subscribe(value => this.drag = value);
    console.log(this.drag);

    this.GEservice.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    }, err => {
      console.error(err);
    });

    if (! this.isUserLoggedIn){
      this.translate.setDefaultLang('Italiano');
    }

  }

}
