import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcumbComponent } from './breadcumb/breadcumb.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [HeaderComponent,
    FooterComponent,
    BreadcumbComponent,
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
