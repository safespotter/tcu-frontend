import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { CoreComponent } from './core/core.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CoreComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PerfectScrollbarModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
