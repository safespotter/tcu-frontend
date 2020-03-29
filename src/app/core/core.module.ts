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



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  providers:[
    LoginActions,
    BsModalService,
    UserService,
    FilterActions,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule { }
