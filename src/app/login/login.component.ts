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

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit() {
  }

  registrationEvent(username, passw, repassw) {
    let obj = {
      user: username,
      pass: passw,
      repass: repassw
    }

    if (this.validation(obj)) {
      this.httpService.registerPostToServer(obj).subscribe(
        (response) => this.saveTokenToLocalstorage(response),
        (error) => console.log(error)
      );
    }
  }

  loginEvent(username, passw) {
    let obj = {
      user: username,
      pass: passw
    };

    if (this.validation(obj)) { 
      this.httpService.loginPostToServer(obj).subscribe(
        (response) => this.saveTokenToLocalstorage(response),
        (error) => console.log(error)
      );
    }
  };

  validation(obj) {
    const a = undefined;
    const b = '';

    if (obj.user === a || obj.pass === a || obj.user === b || obj.pass === b  ) {
      this.error = 'Missing username or password';
    } else {
      if (obj.pass != obj.repass && arguments.length === 3) {
        this.error = 'Password doesn\'t match';
      } else {
        return {
          user: obj.user,
          pass: obj.pass
        }
      }
    }
  }

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

