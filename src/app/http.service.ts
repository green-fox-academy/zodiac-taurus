import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpService {
  constructor(private http: Http) {}

  postToServer(data) {
    return this.http.post('https://draw-and-guess-game-backend.herokuapp.com/login', data);
  }

  registerPostToServer(data) {
    return this.http.post('https://draw-and-guess-game-backend.herokuapp.com/register', data);
  }
}