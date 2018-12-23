import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable()
export class PusherServiceProvider {
  presenceChannel;

  constructor(public http: HttpClient) {
    let pusher = new Pusher('5cc5ada79b7c2b24de8d', {
      authEndpoint: 'http://localhost:3128/pusher/auth',
      cluster: 'eu'
    });

    this.presenceChannel = pusher.subscribe('presence-channel');
  }
  
  public init() {
    return this.presenceChannel;
  }


}
