import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {FeatureComponent} from './feature.component';
import {IsAuthenticatedGuard} from '../shared/_guards/is-authenticated.guard';
import {AuthenticationService} from './authentication/authentication.service';
import {CamComponent} from '../core/card/cam/cam.component';
import {AddLamppostComponent} from '../core/card/add-lamppost/add-lamppost.component';

const routes: Routes = [{
  path: '', component: FeatureComponent, children: [
    {
      path: '',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [IsAuthenticatedGuard]
    },
    {path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
    {path: 'oldHome', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [IsAuthenticatedGuard]},
    {path: 'cam', component: CamComponent, canActivate: [IsAuthenticatedGuard]},
    {path: 'new_lamppost', component: AddLamppostComponent, canActivate: [IsAuthenticatedGuard]}]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [IsAuthenticatedGuard, AuthenticationService]
})
export class FeatureRoutingModule {
}
