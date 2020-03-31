import {Component, OnDestroy, OnInit} from '@angular/core';
import {Breadcrumb} from "../../core/breadcrumb/Breadcrumb";
import {BreadcrumbActions} from "../../core/breadcrumb/breadcrumb.actions";
import {User} from "../../shared/_models/User";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  lang: string;
  value: string;
  tmp: string;
  user: User;

  constructor(
    private breadcrumbActions: BreadcrumbActions,
  ){ }

  ngOnInit(){
    this.addBreadcrumb();
  }

  ngOnDestroy(){
    this.removeBreadcrumb();
  }

  addBreadcrumb() {
    const bread = [] as Breadcrumb[];

    bread.push(new Breadcrumb('Home', '/'));
    bread.push(new Breadcrumb('Dashboard', '/dashboard/'));

    this.breadcrumbActions.updateBreadcrumb(bread);
  }

  removeBreadcrumb() {
    this.breadcrumbActions.deleteBreadcrumb();
  }


}
