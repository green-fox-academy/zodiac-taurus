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
  registration = false;

  constructor(private httpService: HttpService) {}

  ngOnInit() {

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
    if (data.json().status === 'error') {
      delete localStorage.token
    } else {
      localStorage.setItem('token', data.json().token);
    }
  }

  register(){
    if(this.registration){
      this.registration = false;
    } else {
      this.registration = true;
    }
  }

}







