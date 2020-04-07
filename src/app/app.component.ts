import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from "./shared/_models/User";
import {GlobalEventsManagerService} from "./shared/_services/global-event-manager.service";
import {UserService} from "./shared/_services/user.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  //templateUrl: './app.component.html',
   //styleUrls: ['./app.component.scss']
})

export class AppComponent  implements OnInit {
  title = 'tcu-frontend';

  drag: boolean;

  data: any;
  user: User;
  lang: string;
  value: string;


  constructor(
    private router: Router,
    private GEservice: GlobalEventsManagerService,
    private http: HttpClient,
    private userService: UserService,
    public translate: TranslateService
  ) {
    this.userService.get().subscribe(data => {
      this.user = data;
      this.translate.setDefaultLang(this.conversionSetDefaultLang());
      });

    }

  ngOnInit(): void {
    try {
      this.router.events.subscribe((evt) => {

        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
      this.GEservice.dragAndDrop.subscribe(value => this.drag = value);


    } catch (e) {
      console.log(e);
    }

  }

  conversionSetDefaultLang () {
    switch (this.user.lang) {
      case "it" :
        this.value = 'Italiano';
        break;
      case "en" :
        this.value = 'English';
        break;
      default:
        this.value = 'Italiano';
    }

    return this.value;
  }
}
