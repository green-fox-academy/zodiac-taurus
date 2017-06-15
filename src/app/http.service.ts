import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpService {
	constructor(private http: Http) {}
	something(data) {
		return this.http.post('https://draw-and-guess-game-backend.herokuapp.com/login', data);
	}
}