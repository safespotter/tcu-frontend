import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {CustomComponent} from './custom/custom.component';

const routes: Routes = [{ path: '', redirectTo: 'custom', pathMatch: 'full'},
  {path: 'custom', component: CustomComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
