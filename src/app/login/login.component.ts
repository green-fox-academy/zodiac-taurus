import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	name: string;
	passw: string;
	loginEvent(username, password) {
		let obj = {
			user: username,
			pass: password
		}
		this.httpService.postToServer(obj).subscribe(
				// (response) => console.log(response),
				(response) => this.saveTokenToLocalstorage(response),
				(error) => console.log(error)
			);
	};

	saveTokenToLocalstorage(data) {
		localStorage.setItem('token', data.json().token);
		console.log(localStorage.getItem('token'));
	}


	constructor(private httpService: HttpService) {}

	ngOnInit() {

	}
}







