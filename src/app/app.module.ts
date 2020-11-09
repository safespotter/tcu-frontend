import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
// import {AlertModule, BsDropdownModule, TabsModule} from 'ngx-bootstrap';
import {ToastContainerModule, ToastrModule} from 'ngx-toastr';
import {ReactiveFormsModule} from '@angular/forms';
import {OverlayModule} from '@angular/cdk/overlay';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {DragulaModule} from 'ng2-dragula';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StoreService} from './shared/_services/store.service';
import {GlobalEventsManagerService} from './shared/_services/global-event-manager.service';
import {JwtInterceptor} from './shared/jwt.interceptor';
import {StoreModule} from './shared/store/store.module';
import {CoreModule} from './core/core.module';
import {ChartsModule} from 'ng2-charts';
import {SocketioService} from "./shared/_services/socketio.service";
import {AgmCoreModule} from "@agm/core";
import { GaugeModule } from 'angular-gauge';
import {DataService} from "./shared/_services/data.service";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {PushNotificationService} from "./shared/_services/push-notification.service";
import {AlertModule} from 'ngx-bootstrap/alert';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {SafespotterService} from './shared/_services/safespotter.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAILTIuozewL1QOfk9Z9V4FkYSWcEQTVFM'
    }),
    BrowserAnimationsModule,
    CoreModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true
    }),
    ToastContainerModule,
    StoreModule,
    DragulaModule.forRoot(),
    OverlayModule,
    ToastrModule.forRoot({preventDuplicates: true }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    GaugeModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    DataService,
    StoreService,
    GlobalEventsManagerService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    SocketioService,
    PushNotificationService,
    SafespotterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  private static DragulaModule: any;
}
