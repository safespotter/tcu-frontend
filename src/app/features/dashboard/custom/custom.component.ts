import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
//import {BsLocaleService, BsModalRef, BsModalService} from 'ngx-bootstrap';
import {BreadcrumbActions} from '../../../core/breadcrumb/breadcrumb.actions';
import {GlobalEventsManagerService} from '../../../shared/_services/global-event-manager.service';
import {FilterActions} from '../redux-filter/filter.actions';
import {UserService} from '../../../shared/_services/user.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder} from '@angular/forms';
import {DragulaService} from 'ng2-dragula';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../shared/_models/User';
import {SocketioService} from '../../../shared/_services/socketio.service';
import {MatTableDataSource} from '@angular/material/table';
import {Info} from '../../../shared/_models/info.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {DataService} from '../../../shared/_services/data.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {
  title = 'DashBoard';
  user: User;
  dateChoice: String;
  value: String;
  platform = environment.platform;

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
    private http: HttpClient,
    public srv: SocketioService,
    private datasev: DataService,
  ) {
    //
    this.userService.get().subscribe(value => {
      this.user = value;

      this.http.get('./assets/langSetting/langToastr/' + this.conversionSetDefaultLang() + '.json')
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

  received: string;
  mapToVideo: string;

  receiveFromMapSendToVideo($event) {
    this.received = $event;
    this.mapToVideo = this.received;
  }

  modalRef: BsModalRef;

  ngOnInit() {
    this.srv.listen('dataUpdate').subscribe((res: any) => {
      let tmp = res[0];
      tmp = tmp.filter(el => !el.checked && el.platform === this.platform);
      for (const el of tmp) {
        for (const el_config of el.configuration) {
          if (el.alert_id == el_config.alert_id) {
            if (el.alert_id == 5 && el.manualAlert == 0) {
            } else {
              switch (el_config.configuration_type) {
                case '0':
                  break;
                case '1':
                  this.toastr.info(el.street + ': rilevato ' + this.datasev.convertAnomalies(el.alert_id), 'ALLERTA VERDE', {timeOut: 10000});
                  break;
                case '2':
                  this.toastr.success(el.street + ': rilevato ' + this.datasev.convertAnomalies(el.alert_id), 'ALLERTA GIALLA', {timeOut: 10000});
                  break;
                case '3':
                  this.toastr.warning(el.street + ': rilevato ' + this.datasev.convertAnomalies(el.alert_id), 'ALLERTA ARANCIONE', {timeOut: 10000});
                  break;
                case '4':
                  this.toastr.error(el.street + ': rilevato ' + this.datasev.convertAnomalies(el.alert_id), 'ALLERTA ROSSA', {timeOut: 10000});
                  break;
              }
            }
          }
        }
      }
    });
  }

  // convertAnomalies(alert_id) {
  //   switch (parseInt(alert_id, 10)) {
  //     case 1:
  //       return 'Cambio di corsia illegale';
  //     case 2:
  //       return 'Traffico congestionato';
  //     case 3:
  //       return 'Oggetto o persona in strada';
  //     case 4:
  //       return 'Invasione di area pedonale';
  //     case 5:
  //       return 'Possible incidente';
  //     case 6:
  //       return 'Veicolo in sosta vietata';
  //     default:
  //       return 'Errore anomalia';
  //   }
  // }


  conversionSetDefaultLang() {

    switch (this.user.lang) {
      case 'it' :
        this.value = 'Italiano';
        break;
      case 'en' :
        this.value = 'English';
        break;
      default:
        this.value = 'Italiano';
    }

    return this.value;
  }
}
