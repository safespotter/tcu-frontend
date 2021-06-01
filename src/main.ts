import 'hammerjs';
import {ApplicationRef, enableProdMode} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {enableDebugTools} from "@angular/platform-browser";

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .then(moduleRef => {
//     const applicationRef = moduleRef.injector.get(ApplicationRef);
//     const componentRef = applicationRef.components[0];
//     // allows to run `ng.profiler.timeChangeDetection();`
//     enableDebugTools(componentRef);
//   })
//   .catch(err => console.log(err));

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  if ('serviceWorker' in navigator && environment.production) {
    navigator.serviceWorker.register('/ngsw-worker.js');
  }
}).catch(err => console.log(err));
