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
  registrationForm = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {

  }

  registrationEvent(username, passw, repassw) {
    // console.log('data: ', username, passw, repassw);
    if (passw != repassw) {
      console.log('Passwords don\'t match');
    } else {
      const obj = {
        user: username,
        pass: passw
      }
      // console.log(obj);
      this.httpService.registerPostToServer(obj).subscribe(
        // (response) => console.log(response),
        (response) => this.saveTokenToLocalstorage(response),
        (error) => console.log(error)
      );
    }
  }


  loginEvent(username, password) {
    const obj = {
      user: username,
      pass: password
    }
    this.httpService.postToServer(obj).subscribe(
        (response) => this.saveTokenToLocalstorage(response),
        (error) => console.log(error)
      );
  };


  saveTokenToLocalstorage(data) {
    console.log(data);
    if (data.json().status === 'error') {
      console.log(data.json().message);
      delete localStorage.token
    } else {
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







