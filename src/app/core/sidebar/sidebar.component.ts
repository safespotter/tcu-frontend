import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

import {User} from "../../shared/_models/User";
import {GlobalEventsManagerService} from "../../shared/_services/global-event-manager.service";
import {StoreService} from "../../shared/_services/store.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isUserLoggedIn: boolean;
  userType: number;
  drag: boolean;

  lang: string;
  value: string;
  tmp: string;
  user: User;
  hide: boolean;
  constructor(
    private globalEventService: GlobalEventsManagerService,
    private storeService: StoreService,
    public translate: TranslateService,
  ) {
    this.globalEventService.draggable.subscribe(value => {
      this.drag = value;
    });
  }

  ngOnInit() {
    try {
      this.globalEventService.isUserLoggedIn.subscribe(value => {
        this.isUserLoggedIn = value;
        this.userType = parseInt(this.storeService.getType());
      });

      if (! this.isUserLoggedIn) {
        this.translate.setDefaultLang('Italiano');
      }
    } catch (e) {
      console.log(e)
    }
  }

  public checkDrag () {
    if (this.drag) {
      return true;
    } else {
      return false;
    }
  }
}
