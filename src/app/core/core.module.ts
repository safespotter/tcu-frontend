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
import { GeoChartComponent } from './card/geo-chart/geo-chart.component';
import {ChartsModule} from "ng2-charts";
import {Ng2GoogleChartsModule} from "ng2-google-charts";
import { MapComponent } from './card/map/map.component';
import {GoogleMapsModule} from "@angular/google-maps";
import { TableChartComponent } from './card/table-chart/table-chart.component';
import { VideoComponent } from './card/video/video.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import { NavComponent } from '../features/nav/nav.component';
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    CardComponent,
    SidebarComponent,
    GeoChartComponent,
    MapComponent,
    TableChartComponent,
    VideoComponent,
    NavComponent,
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
    ChartsModule,
    Ng2GoogleChartsModule,
    GoogleMapsModule,
    MatVideoModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    AuthenticationService,
    LoginActions,
    BsModalService,
    UserService,
    FilterActions,
    ApiKeysService,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    NavComponent,
    FooterComponent,
    BreadcrumbComponent,
    GeoChartComponent,
    MapComponent,
    VideoComponent,
    TableChartComponent,
  ]
})
export class CoreModule { }
