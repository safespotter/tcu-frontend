import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpHeaders} from "@angular/common/http"; // change in production

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  listen(Eventname: string) {
    console.log(Eventname)
    console.log('sono nel listen sul service')

    return new Observable((subscriber) => {
      this.socket.on(Eventname, (data) => {
        subscriber.next(data);
      });
    });
  }

  notification(Eventname: string) {
    console.log('ci sono');
    return new Observable((subscriber) => {
      this.socket.on(Eventname, (data) => {
        subscriber.next(data);
      });
    });
  }
}
