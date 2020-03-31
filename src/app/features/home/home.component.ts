import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbActions} from "../../core/breadcrumb/breadcrumb.actions";
import {TranslateService} from "@ngx-translate/core";
import {Breadcrumb} from "../../core/breadcrumb/Breadcrumb";
import {User} from "../../shared/_models/User";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  lang: string;
  value: string;
  tmp: string;
  user: User;

  constructor(
    private breadcrumbActions: BreadcrumbActions,
    public translate: TranslateService,
  ) { }

  ngOnInit(){
    this.addBreadcrumb();
  }

  ngOnDestroy() {
    this.removeBreadcrumb();
  }

  addBreadcrumb() {
    const bread = [] as Breadcrumb[];

    bread.push(new Breadcrumb('Home', '/'));

    this.breadcrumbActions.updateBreadcrumb(bread);
  }

  removeBreadcrumb() {
    this.breadcrumbActions.deleteBreadcrumb();
  }

}
