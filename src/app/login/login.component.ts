import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../http.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FormsModule]
})

export class LoginComponent implements OnInit {

  name: string;
  passw: string;
  repassw: string;
  error: string;
  registrationForm = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
  }

  registrationEvent(username, passw, repassw) {
    if (passw != repassw) {
      this.error = 'Passwords don\'t match';
    } else {
      const obj = {
        user: username,
        pass: passw
      }
      this.httpService.registerPostToServer(obj).subscribe(
        // (response) => console.log(response),
        (response) => this.saveTokenToLocalstorage(response),
        (error) => console.log(error)
      );
    }
  }


  loginEvent(username, password) {
    if (username === undefined || password === undefined || username === '' || password === '' ) {
      this.error = 'Missing username or password';
    } else {
      const obj = {
        user: username,
        pass: password
      }
      this.httpService.loginPostToServer(obj).subscribe(
        (response) => this.saveTokenToLocalstorage(response),
        (error) => console.log(error)
      );
    }
  };


  saveTokenToLocalstorage(data) {
    console.log(data);
    if (data.json().status === 'error') {
      console.log(data.json().message);
      this.error = data.json().message
      delete localStorage.token
    } else {
      this.error = "";
      localStorage.setItem('token', data.json().token);
      console.log(localStorage.getItem('token'));
    }
  }

  register() {
    if (this.registrationForm) {
      this.registrationForm = false;
    } else {
      this.registrationForm = true;
    }
  }

}







