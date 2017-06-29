import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HomeComponent } from './home/home.component';

@Injectable()
export class HttpService {

  url:string = 'https://draw-and-guess-game-backend.herokuapp.com/'

  constructor(private http: Http) { }

  loginPostToServer(data) {
    return this.http.post(this.url + 'login', data);
  }

  registerPostToServer(data) {
    return this.http.post(this.url + 'register', data);
  } 

  listAllRoom() {
    const headers = new Headers({auth: localStorage.getItem('token')});
    return this.http.get(this.url + 'room', {headers: headers});
  }

  createRoom(data) {
    const headers = new Headers({auth: localStorage.getItem('token')})
    return this.http.post(this.url + 'room', data, {headers: headers});
  }

  sendImagetoServer(data) {
    const headers = new Headers({auth: localStorage.getItem('token')})
    return this.http.post(this.url + 'rooms/:id/image', data, {headers: headers});
  }

  enterRoom(data) {
    const headers = new Headers({auth: localStorage.getItem('token')})
    return this.http.get(this.url + 'rooms/' + data);
  }
}