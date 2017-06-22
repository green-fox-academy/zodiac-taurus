import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ FormsModule ]
})

export class LoginComponent implements OnInit {

  name: string;
  passw: string;
  repassw: string;
  error: string;
  registrationForm = false;

  constructor(private httpService: HttpService, private router: Router) {
  }

  ngOnInit() {
  }

  registrationEvent(username, passw, repassw) {
    if (username === undefined || passw === undefined || username === '' || passw === '' ) {
      this.error = 'Missing username or password';
    } else {
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
    if (data.json().status === 'error') {
      this.error = data.json().message
      delete localStorage.token
    } else {
      this.error = "";
      localStorage.setItem('token', data.json().token);
      localStorage.setItem('user', data.json().user);
      this.router.navigate(['']);
    }
  }

  register() {
    this.registrationForm = !this.registrationForm;
  }
}







