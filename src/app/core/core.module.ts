import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CardComponent } from './card/card.component';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {LoginActions} from '../features/authentication/login/login.actions';
// import {BsModalService} from 'ngx-bootstrap';
import {UserService} from '../shared/_services/user.service';
import {FilterActions} from '../features/dashboard/redux-filter/filter.actions';
import {AuthenticationService} from '../features/authentication/authentication.service';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {ApiKeysService} from '../shared/_services/apikeys.service';
import { GeoChartComponent } from './card/geo-chart/geo-chart.component';
import {ChartsModule} from 'ng2-charts';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import { MapComponent } from './card/map/map.component';
import {GoogleMapsModule} from '@angular/google-maps';
import { TableChartComponent } from './card/table-chart/table-chart.component';
import { VideoComponent } from './card/video/video.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { NavComponent } from '../features/nav/nav.component';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { DialogComponent } from './card/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AgmCoreModule} from '@agm/core';
import {MatCardModule} from '@angular/material/card';
import { Video2Component } from './card/video2/video2.component';
import {GaugeModule} from 'angular-gauge';
import {MatBadgeModule} from '@angular/material/badge';
import { ActionRequestComponent } from './card/action-request/action-request.component';
import { VideoPersonalComponent } from './card/video-personal/video-personal.component';
import { TablePersonalComponent } from './card/table-personal/table-personal.component';
import {MatInputModule} from '@angular/material/input';
import {BsModalService} from 'ngx-bootstrap/modal';
import {WeatherComponent} from './card/weather/weather.component';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {WeatherService} from '../shared/_services/weather.service';
import {LamppostConfigurationComponent} from './card/lamppost-configuration/lamppost-configuration.component';
import {MatSlideToggleModule} from '@angular/material';



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
    DialogComponent,
    Video2Component,
    ActionRequestComponent,
    VideoPersonalComponent,
    TablePersonalComponent,
    WeatherComponent,
    LamppostConfigurationComponent
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
    MatTableModule,
    MatDialogModule,
    AgmCoreModule,
    MatCardModule,
    GaugeModule,
    MatBadgeModule,
    MatInputModule,
    TooltipModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthenticationService,
    LoginActions,
    BsModalService,
    UserService,
    FilterActions,
    ApiKeysService,
    WeatherService,
    FormBuilder
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
    Video2Component,
    VideoPersonalComponent,
    TablePersonalComponent,
    WeatherComponent,
    LamppostConfigurationComponent
  ]
})
export class CoreModule { }
