import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';
import { HomeComponent } from './home/home.component';
import {CoreModule} from "../core/core.module";
import {P404Component} from "../errors/404.component";
import {P500Component} from "../errors/500.component";


@NgModule({
  declarations: [FeatureComponent,
    P404Component,
    P500Component
  ],
  imports: [
    FeatureRoutingModule,
    CoreModule
  ]
})
export class FeatureModule { }
