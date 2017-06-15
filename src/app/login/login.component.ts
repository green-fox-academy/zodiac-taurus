import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginEvent(username, password) {
		let obj = {
			user: username,
			pass: password
		}
		console.log(obj);
		this.httpService.something(obj).subscribe(
				(response) => console.log(response),
				(error) => console.log(error)
			);
		// return obj;
	};

	constructor(private httpService: HttpService) {}

	ngOnInit() {

	}
}







