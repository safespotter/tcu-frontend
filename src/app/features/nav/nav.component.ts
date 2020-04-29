import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/_models/User';
import {LoginActions} from '../authentication/login/login.actions';
import {StoreService} from '../../shared/_services/store.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {GlobalEventsManagerService} from '../../shared/_services/global-event-manager.service';
import {UserService} from '../../shared/_services/user.service';
import {TranslateService} from '@ngx-translate/core';
import {ApiKeysService} from '../../shared/_services/apikeys.service';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  title = 'SafeSpotter';
  isUserLoggedIn = false;
  showSidebar = false;
  username: string;
  today: string;
  appName = 'SafeSpotter'
  lang: string;
  value: string;
  tmp: string;
  user: User;

  drag: boolean;
  hide: boolean;
  userType: number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private actions: LoginActions,
    private localStore: StoreService,
    private authService: AuthenticationService,
    public translate: TranslateService,
    private storeService: StoreService,
    private globalEventService: GlobalEventsManagerService,
    private userService: UserService,
    private apiKeyService: ApiKeysService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.today = new Date().toLocaleString();
    this.today = this.today.substr(0, this.today.length - 10);

    this.globalEventService.draggable.subscribe(value => {
      this.drag = value;
    });
    try {
      this.globalEventService.isUserLoggedIn.subscribe(value => {
        this.isUserLoggedIn = value;
        this.userType = parseInt(this.storeService.getType(), 10);
      });
    }catch (e) {
      console.log(e)

    }
  }

  async ngOnInit() {
    this.globalEventService.dragAndDrop.subscribe(value => this.drag = value);

    this.globalEventService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
      this.username = this.localStore.getUserNames();
    });

    if (this.isUserLoggedIn) {
      //  const pageID = (await this.apiKeyService.getAllKeys().toPromise());
    }

    if (!this.isUserLoggedIn) {
      this.translate.setDefaultLang('Italiano');
    }

  }

  logout() {
    this.actions.logoutUser();
    this.authService.logout();
  }

  showMenu(show: boolean) {
    this.showSidebar = show;
  }

  onLogout(event){
     this.logout()
  }

  public checkDrag() {
    if (this.drag) {
      return true;
    } else {
      return false;
    }
  }
}
