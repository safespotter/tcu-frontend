import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[

  ],
  exports: [
    HeaderComponent,
  ]
})
export class CoreModule { }
