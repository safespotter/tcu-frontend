import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';
import { HomeComponent } from './home/home.component';
import {CoreModule} from '../core/core.module';
import {P404Component} from '../errors/404.component';
import {P500Component} from '../errors/500.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {IsAuthenticatedGuard} from '../shared/_guards/is-authenticated.guard';
import {SharedModule} from "../shared/shared.module";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {NgxLoadingModule} from "ngx-loading";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PublicComponent } from './public/public.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [FeatureComponent,
    P404Component,
    P500Component,
    PublicComponent,
  ],
  imports: [
    FeatureRoutingModule,
    CoreModule,
    SharedModule,
    PerfectScrollbarModule,
    NgxLoadingModule.forRoot({}),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    IsAuthenticatedGuard,
    FormBuilder
  ]
})
export class FeatureModule { }
