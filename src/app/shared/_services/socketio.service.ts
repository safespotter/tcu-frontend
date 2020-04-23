import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs"; // change in production

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  listen(Eventname: string) {
    return new Observable((subscriber) => {
      this.socket.on(Eventname, (data) => {
        subscriber.next(data);
      });
    });
  }
}
