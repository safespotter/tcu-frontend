import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";
import {TranslateModule} from "@ngx-translate/core";
import {UserService} from "../../shared/_services/user.service";
import {BreadcrumbActions} from "../../core/breadcrumb/breadcrumb.actions";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    CoreModule,
    HomeRoutingModule,
    TranslateModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
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
