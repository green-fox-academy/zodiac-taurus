import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

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

  constructor(private httpService: HttpService, private router: Router) {
    this.loggedIn();
  }

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

  loggedIn(){
     if (localStorage.token !== undefined) {
        this.router.navigate(['']);
     }
  }

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
      this.router.navigate(['']);
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







