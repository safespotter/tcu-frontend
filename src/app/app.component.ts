import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from './shared/_models/User';
import {GlobalEventsManagerService} from './shared/_services/global-event-manager.service';
import {UserService} from './shared/_services/user.service';
import {TranslateService} from '@ngx-translate/core';
import {SwPush} from '@angular/service-worker';
import {PushNotificationService} from './shared/_services/push-notification.service';


const VAPID_PUBLIC = 'BNSrTeHaLFawJXTb6T__91UO9pDz98O4-TYmtCEaxkrXSDTYGdVBMDm1oeUhVo2DQ8VOso_7ejteQYJKwlnfHws';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  //templateUrl: './app.component.html',
  //styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'tcu-frontend';

  drag: boolean;

  data: any;
  user: User;
  lang: string;
  value: string;

  payload = JSON.stringify({
    'notification': {
      'title': 'Web Mail Notification',
      'body': 'New Mail Received!',
      'icon': 'images/bell.jpg',
      'vibrate': [100, 50, 100], //will cause the device to vibrate for 100 ms, be still for 50 ms, and then vibrate for 100 ms
      'requireInteraction': true,
      'data': {'dateOfArrival': Date.now(),},
      'actions': [{'action': 'inbox', 'title': 'Go to Web Mail',}]
    }
  })


  constructor(
    private router: Router,
    private GEservice: GlobalEventsManagerService,
    private http: HttpClient,
    private userService: UserService,
    public translate: TranslateService,
    public swPush: SwPush,
    public pushService: PushNotificationService
  ) {
    // console.log('swPush', swPush);
    // if (swPush.isEnabled) {
    //   this.swPush.notificationClicks.subscribe(x => console.log(x));
    //   swPush.requestSubscription({
    //     serverPublicKey: VAPID_PUBLIC,
    //   })
    //     .then(subscription => {
    //       pushService.sendSubscriptionToTheServer(subscription).subscribe()
    //     })
    //     .catch(console.error);
    // }
    //
    // this.userService.get().subscribe(data => {
    //   this.user = data;
    //   this.translate.setDefaultLang(this.conversionSetDefaultLang());
    // });

  }

  ngOnInit(): void {
    // this.pushSubscription();
    // this.swPush.messages.subscribe(message => console.log(message));
    // this.swPush.notificationClicks.subscribe(({action, notification}) => {window.open(notification.data.url); } );
    this.subscribeToNotifications();
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

  // conversionSetDefaultLang() {
  //   switch (this.user.lang) {
  //     case 'it' :
  //       this.value = 'Italiano';
  //       break;
  //     case 'en' :
  //       this.value = 'English';
  //       break;
  //     default:
  //       this.value = 'Italiano';
  //   }
  //
  //   return this.value;
  // }

  subscribeToNotifications() {
    if (this.swPush.isEnabled) {
      this.swPush.notificationClicks.subscribe(x => console.log("x", x));
      this.swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC
      })
        .then(sub => {
          this.pushService.sendSubscriptionToTheServer(sub).subscribe(y => console.log('y', y), err => console.log(err));
        })
        .catch(err => console.error('Could not subscribe to notifications', err));
    }
  }
}

// pushSubscription()
// {
//   if (!this.swPush.isEnabled) {
//     'sw is not enabled'
//     return;
//   }
//   // this.swPush.requestSubscription({serverPublicKey: VAPID_PUBLIC, }).then(sub => console.log(JSON.stringify(sub))).catch(err => console.error("Could not subscribe to notifications", err));
//
//   // console.log('sono su app')
//   // console.log(swPush)
//   // if (swPush.isEnabled) {
//   //   console.log('dentro if')
//   console.log('entro qui dentro?')
//   this.swPush.requestSubscription({serverPublicKey: VAPID_PUBLIC,}).then(subscription => {
//     this.pushService.sendSubscriptionToTheServer(subscription).subscribe();
//   }).catch(err => console.error('Could not subscribe to notifications', err));
//
// }
//
// }
