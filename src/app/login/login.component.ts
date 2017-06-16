import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FormsModule]
})

export class LoginComponent implements OnInit {
  name: string;
  passw: string;

  loginEvent(username, password) {
    console.log(username, password);
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
      console.log(data.json().status);
      delete localStorage.token
    } else {
      localStorage.setItem('token', data.json().token);
      console.log(localStorage.getItem('token'));
    }
  }


  constructor(private httpService: HttpService) {}

  ngOnInit() {

  }
}







