import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../../shared/_services/user.service";
import {AuthenticationService} from "../authentication.service";
import {BreadcrumbActions} from "../../../core/breadcrumb/breadcrumb.actions";
import {ToastrService} from "ngx-toastr";
import {StoreService} from "../../../shared/_services/store.service";
import {RegisterComponent} from "./register.component";
import {SharedModule} from "../../../shared/shared.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [RegisterFormComponent,
  RegisterComponent],
  imports: [
    SharedModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    RegisterComponent,
    RegisterFormComponent
  ],
  providers: [
    UserService,
    AuthenticationService,
    BreadcrumbActions,
    ToastrService,
    StoreService
  ]
})
export class RegisterModule { }
