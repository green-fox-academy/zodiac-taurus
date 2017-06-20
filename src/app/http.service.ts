import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { HomeComponent } from './home/home.component';

@Injectable()
export class HttpService {

  auth = localStorage.getItem('token');

  constructor(private http: Http) {}

  loginPostToServer(data) {
    return this.http.post('https://draw-and-guess-game-backend.herokuapp.com/login', data);
  }

  registerPostToServer(data) {
    return this.http.post('https://draw-and-guess-game-backend.herokuapp.com/register', data);
  } 

  listAllRoom() {
    const headers = new Headers({auth: this.auth});
    return this.http.get('https://draw-and-guess-game-backend.herokuapp.com/room', {headers: headers});
  }

  createRoom(data) {
    const headers = new Headers({auth: this.auth})
    return this.http.post('https://draw-and-guess-game-backend.herokuapp.com/room', data, {headers: headers});
  }
}