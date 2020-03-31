import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Breadcrumb} from './Breadcrumb';
import {GlobalEventsManagerService} from '../../shared/_services/global-event-manager.service';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../shared/store/model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @select() breadcrumb$: Observable<Breadcrumb[]>;
  breadList = [];
  isUserLoggedIn: boolean;
  drag: boolean;

  constructor(
    private globalEventService: GlobalEventsManagerService,
    private ngRedux: NgRedux<IAppState>) {
    this.globalEventService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });

    this.breadcrumb$.subscribe(elements => {
      this.breadList = elements['list'];
    });
  }

  ngOnInit(): void {
    this.globalEventService.dragAndDrop.subscribe(value => this.drag = value);
  }

}

