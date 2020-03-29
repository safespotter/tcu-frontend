import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn = false;
  showSidebar = false;
  username: string;
  today: string;

  drag: boolean;
  hide: boolean;


  constructor() {
    this.today = new Date().toLocaleString();
    this.today = this.today.substr(0, this.today.length - 10);
  }

  ngOnInit() {
  }

  showMenu(show: boolean) {
    this.showSidebar = show;
  }

}
