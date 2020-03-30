import { Component, OnInit } from '@angular/core';
import {BreadcrumbActions} from "../../../core/breadcrumb/breadcrumb.actions";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../shared/_services/user.service";
import {GlobalEventsManagerService} from "../../../shared/_services/global-event-manager.service";
import {Breadcrumb} from "../../../core/breadcrumb/Breadcrumb";
import {User} from "../../../shared/_models/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;
  value: string;


  constructor(
    private breadcrumbActions: BreadcrumbActions,
    private http: HttpClient,
    public userService: UserService,
    private GEService: GlobalEventsManagerService
  ) {
  }

  ngOnDestroy(): void {
    this.breadcrumbActions.deleteBreadcrumb();
  }

  ngOnInit(): void {
    this.addBreadcrumb();
  }

  addBreadcrumb() {
    const bread = [] as Breadcrumb[];

    bread.push(new Breadcrumb('Home', '/'));

    if (this.GEService.getStringBreadcrumb('CREA_ACCOUNT') == null) {

      this.userService.get().subscribe(value => {
        this.user = value;

        this.http.get("./assets/langSetting/langBreadcrumb/" + this.conversionSetDefaultLang() + ".json")
          .subscribe(file => {
            this.GEService.langBread.next(file);
            bread.push(new Breadcrumb(this.GEService.getStringBreadcrumb('CREA_ACCOUNT'), '/authentication/register'));
          })
      })

    } else {
      bread.push(new Breadcrumb(this.GEService.getStringBreadcrumb('CREA_ACCOUNT'), '/authentication/register'));
    }

    this.breadcrumbActions.updateBreadcrumb(bread);
  }

  conversionSetDefaultLang () {

    switch (this.user.lang) {
      case "it" :
        this.value = "Italiano";
        break;
      case "en" :
        this.value = "English";
        break;
      default:
        this.value = "Italiano";
    }

    return this.value;
  }

}
