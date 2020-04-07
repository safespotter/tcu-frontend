import { NgModule } from '@angular/core';
import {FeatureAuthenticationLoginFormComponent} from './login-form/login-form.component';
import {AuthenticationLoginComponent} from './login.component';
import {UserService} from '../../../shared/_services/user.service';
import {AuthenticationService} from '../authentication.service';
import {SharedModule} from '../../../shared/shared.module';
import {RouterLinkActive, RouterModule} from '@angular/router';
import {StoreService} from '../../../shared/_services/store.service';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    FeatureAuthenticationLoginFormComponent,
    AuthenticationLoginComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    FeatureAuthenticationLoginFormComponent,
    AuthenticationLoginComponent
  ],
  providers: [
    UserService,
    AuthenticationService,
    StoreService
  ]
})
export class LoginModule {}
