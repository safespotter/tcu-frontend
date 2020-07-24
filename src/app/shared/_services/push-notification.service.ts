import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

const SERVER_URL = 'http://localhost:3000/subscription';
const SERVER_URL1 = 'http://localhost:3000/sendNotification';

@Injectable()
export class PushNotificationService {
  constructor(private http: HttpClient) {}

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    console.log('ci arrivo sono nel service')
    console.log(this.http.post(SERVER_URL, subscription))
    return this.http.post(SERVER_URL, subscription);
  }
}
