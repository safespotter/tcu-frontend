import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {IsAuthenticatedGuard} from "./shared/_guards/is-authenticated.guard";


const routes: Routes = [
  { path: '',
    component: AppComponent,
    loadChildren: () => import('./features/feature.module').then(m => m.FeatureModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false, enableTracing: false })],
  exports: [RouterModule],
  providers: [IsAuthenticatedGuard]
})
export class AppRoutingModule { }
