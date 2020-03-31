import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './authentication.component';
import {AccountVerificationComponent} from './account-verification/account-verification.component';
import {IsNotAuthenticatedGuard} from '../../shared/_guards/is-not-authenticated.guard';
import {RegisterComponent} from './register/register.component';
import {IsAdminGuard} from '../../shared/_guards/is-admin.guard';
import {AuthenticationLoginComponent} from './login/login.component';

const routes: Routes = [
  {
   path: '',
  redirectTo: 'login' },
  {
    path: 'login',
    component: AuthenticationLoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [IsAdminGuard]
  },
  {
    path: 'account-verification',
    component: AccountVerificationComponent,
    canActivate: [IsNotAuthenticatedGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [IsAdminGuard, IsNotAuthenticatedGuard]
})
export class AuthenticationRoutingModule { }
