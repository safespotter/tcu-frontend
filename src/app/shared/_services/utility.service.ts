import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  timerChange(value) {
    setTimeout ( () =>  {
      value = 0;
    }, 10000);

    return value;
  }
}
