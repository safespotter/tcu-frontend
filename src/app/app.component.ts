import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
  //templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss']
})

export class AppComponent  implements OnInit {
  title = 'tcu-frontend';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    try {
      this.router.events.subscribe((evt) => {

        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });

    } catch (e) {
      console.log(e);
    }

  }
}
