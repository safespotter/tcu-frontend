import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";
import {TranslateModule} from "@ngx-translate/core";
import {UserService} from "../../shared/_services/user.service";
import {BreadcrumbActions} from "../../core/breadcrumb/breadcrumb.actions";


@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    CoreModule,
    HomeRoutingModule,
    TranslateModule
  ],
  providers: [
    UserService,
    BreadcrumbActions
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
