import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import {AlertModule} from 'ngx-bootstrap';
import {RouterModule} from '@angular/router';
import {AlertModule} from 'ngx-bootstrap/alert';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlertModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    RouterModule
  ]
})
export class SharedModule { }
