import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from "./shared/_models/User";
import {GlobalEventsManagerService} from "./shared/_services/global-event-manager.service";
import {UserService} from "./shared/_services/user.service";
import {TranslateService} from "@ngx-translate/core";
import { SwPush } from '@angular/service-worker';
import { PushNotificationService} from "./shared/_services/push-notification.service";


const VAPID_PUBLIC = 'BFSKwNnTBL_de-3GSMGYFL9iB09a9Xz1EmyT3iRQ8L0WXWEO01_2XORztfHc_F816x4XhI7-SeEekCqwh7M5nv0';
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
    public translate: TranslateService,
    public swPush: SwPush,
    public pushService: PushNotificationService
  ) {

    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC,
        })
        .then(subscription => {
          pushService.sendSubscriptionToTheServer(subscription).subscribe()
        })
        .catch(console.error);
    }

    this.userService.get().subscribe(data => {
      this.user = data;
      this.translate.setDefaultLang(this.conversionSetDefaultLang());
      });

    }

  ngOnInit(): void {
    // this.pushSubscription();
    // console.log('ci arrivo? miao miao')
    // this.swPush.messages.subscribe(message => console.log(message));
    // this.swPush.notificationClicks.subscribe(({action, notification}) => {window.open(notification.data.url); } );
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

  pushSubscription(){
    if(!this.swPush.isEnabled){
      "sw is not enabled"
      return;
    }
    // this.swPush.requestSubscription({serverPublicKey: VAPID_PUBLIC, }).then(sub => console.log(JSON.stringify(sub))).catch(err => console.error("Could not subscribe to notifications", err));

    // console.log('sono su app')
    // console.log(swPush)
    // if (swPush.isEnabled) {
    //   console.log('dentro if')
      console.log('entro qui dentro?')
      this.swPush.requestSubscription({serverPublicKey: VAPID_PUBLIC, }).
      then(subscription => {
        this.pushService.sendSubscriptionToTheServer(subscription).subscribe();
      }).catch(err => console.error("Could not subscribe to notifications", err));

    }

}
