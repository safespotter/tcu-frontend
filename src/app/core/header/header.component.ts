import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/_models/User';
import {LoginActions} from '../../features/authentication/login/login.actions';
import {StoreService} from '../../shared/_services/store.service';
import {AuthenticationService} from '../../features/authentication/authentication.service';
import {GlobalEventsManagerService} from '../../shared/_services/global-event-manager.service';
import {UserService} from '../../shared/_services/user.service';
import {TranslateService} from '@ngx-translate/core';
import {ApiKeysService} from '../../shared/_services/apikeys.service';

@Component({
  selector: 'app-core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn = false;
  showSidebar = false;
  username: string;
  today: string;

  lang: string;
  value: string;
  tmp: string;
  user: User;

  drag: boolean;
  hide: boolean;


  constructor(
    private actions: LoginActions,
    private localStore: StoreService,
    private authService: AuthenticationService,
    public translate: TranslateService,
    private globalEventService: GlobalEventsManagerService,
    private userService: UserService,
    private apiKeyService: ApiKeysService,
  ) {
    this.today = new Date().toLocaleString();
    this.today = this.today.substr(0, this.today.length - 10);
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

}
