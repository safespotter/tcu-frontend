import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CardComponent } from './card/card.component';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {LoginActions} from '../features/authentication/login/login.actions';
import {BsModalService} from 'ngx-bootstrap';
import {UserService} from '../shared/_services/user.service';
import {FilterActions} from '../features/dashboard/redux-filter/filter.actions';
import {AuthenticationService} from "../features/authentication/authentication.service";
import {SidebarComponent} from "./sidebar/sidebar.component";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    CardComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  providers:[
    AuthenticationService,
    LoginActions,
    BsModalService,
    UserService,
    FilterActions,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
  ]
})
export class CoreModule { }
