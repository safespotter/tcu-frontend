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

  constructor(
    private router: Router,
    private GEservice: GlobalEventsManagerService,
    private http: HttpClient,
    private userService: UserService,
    public translate: TranslateService,
    public swPush: SwPush,
    public pushService: PushNotificationService
  ) {
  }

  ngOnInit(): void {
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

  subscribeToNotifications() {
    if (this.swPush.isEnabled) {
      this.swPush.notificationClicks.subscribe(x => console.log('x', x));
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


