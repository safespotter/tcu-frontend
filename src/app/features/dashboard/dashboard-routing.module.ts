import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {CustomComponent} from './custom/custom.component';
import {LampComponent} from './lamp/lamp.component';

const routes: Routes = [{ path: '', redirectTo: 'custom', pathMatch: 'full'},
  {path: '', component: CustomComponent}, {path: 'lamp', component: LampComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
