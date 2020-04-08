import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsLocaleService, BsModalRef, BsModalService} from 'ngx-bootstrap';
import {BreadcrumbActions} from "../../../core/breadcrumb/breadcrumb.actions";
import {GlobalEventsManagerService} from "../../../shared/_services/global-event-manager.service";
import {FilterActions} from "../redux-filter/filter.actions";
import {UserService} from "../../../shared/_services/user.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder} from "@angular/forms";
import {DragulaService} from "ng2-dragula";
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../shared/_models/User";

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {
  title ='DashBoard'
  user: User;
  dateChoice: String;
  value: String;

  constructor(
    private breadcrumbActions: BreadcrumbActions,
  //  private DService: DashboardService,
 //   private CCService: ChartsCallsService,
    private GEService: GlobalEventsManagerService,
    private filterActions: FilterActions,
    private userService: UserService,
    private toastr: ToastrService,
    // private ADService: AggregatedDataService,
    private modalService: BsModalService,
 // private apiKeyService: ApiKeysService,
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private dragulaService: DragulaService,
    public translate: TranslateService,
    private http: HttpClient
  ) {
    //
    this.userService.get().subscribe(value => {
      this.user = value;

      this.http.get("./assets/langSetting/langToastr/" + this.conversionSetDefaultLang() + ".json")
        .subscribe(file => {
          this.GEService.langObj.next(file);
        }, error => {
          console.error(error);
        });

      if (this.GEService.getStringFilterDate('FILTER_DATE', 'LAST_30') == null) {
        this.http.get('./assets/langSetting/langStringVarious/' + this.conversionSetDefaultLang() + '.json')
          .subscribe(file => {
            this.GEService.langFilterDate.next(file);
            this.dateChoice = this.GEService.getStringFilterDate('FILTER_DATE', 'LAST_30');
          });

      } else {
        this.dateChoice = this.GEService.getStringFilterDate('FILTER_DATE', 'LAST_30');
      }
    });
  }

  modalRef: BsModalRef;

  ngOnInit() {
  }


  optionModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md modal-dialog-centered'});
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
