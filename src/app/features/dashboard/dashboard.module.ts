import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppFooterModule} from '@coreui/angular';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {PopoverModule} from 'ngx-bootstrap';
import {UserService} from '../../shared/_services/user.service';
import {NgReduxModule} from '@angular-redux/store';
import {CoreModule} from '../../core/core.module';
import { CustomComponent } from './custom/custom.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [DashboardComponent, CustomComponent],
    imports: [
        NgReduxModule,
        CommonModule,
        CoreModule,
        DashboardRoutingModule,
        AppFooterModule,
        PopoverModule.forRoot(),
        TranslateModule,
    ],
  providers: [
    UserService,
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
