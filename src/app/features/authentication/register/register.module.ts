import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [RegisterFormComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
