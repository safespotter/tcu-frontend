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
import {MatSidenavModule} from "@angular/material/sidenav";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {_MatMenuDirectivesModule, MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {ApiKeysService} from "../shared/_services/apikeys.service";



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
    TranslateModule,
    MatSidenavModule,
    FormsModule,
    MatCheckboxModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers:[
    AuthenticationService,
    LoginActions,
    BsModalService,
    UserService,
    FilterActions,
    ApiKeysService
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbComponent,
  ]
})
export class CoreModule { }
