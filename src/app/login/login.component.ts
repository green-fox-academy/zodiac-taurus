import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginEvent(username, password) {

		localStorage.setItem('user', username);
		localStorage.setItem('pass', password);
		let obj = {
			user: localStorage.getItem('user'),
			pass: localStorage.getItem('pass')
		}
		console.log(obj);
		localStorage.clear()

	};

  constructor() { }

  ngOnInit() {

  }
}



