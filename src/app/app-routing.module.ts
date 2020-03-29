import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';


const routes: Routes = [
  { path: '',
    component: AppComponent,
    loadChildren: () => import('./features/feature.module').then(m => m.FeatureModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
