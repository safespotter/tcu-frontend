import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import {AuthenticationService} from './authentication.service';
import {UserService} from '../../shared/_services/user.service';
import {LoginModule} from './login/login.module';
import {RegisterModule} from './register/register.module';
import {SharedModule} from '../../shared/shared.module';
import {BsDropdownModule} from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AuthenticationComponent,
    AccountVerificationComponent],
  imports: [
    AuthenticationRoutingModule,
    LoginModule,
    RegisterModule,
    SharedModule,
    BsDropdownModule,
  ],
  providers: [
    AuthenticationService,
    UserService
  ],
  exports: [
    AuthenticationComponent,
    AccountVerificationComponent
  ]
})
export class AuthenticationModule { }
