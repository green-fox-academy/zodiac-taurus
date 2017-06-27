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


  upAnimationClass;
  errorStyle: object;
  name: string;
  passw: string;
  repassw: string;
  error: string;
  registrationForm = false;
  dismissErr;

  constructor(private httpService: HttpService, private router: Router) {
    window.addEventListener("keydown", this.enterEvent.bind(this));
  }

  ngOnInit() {
  }

  enterEvent(e){
		if(e.keyCode == 13){
			if(this.registrationForm){
        this.registrationEvent(this.name, this.passw, this.repassw);
      } else {
         this.loginEvent(this.name, this.passw);
      }
		}
	}

  errorStyling(){
    if(this.error){
      this.errorStyle = {'border':'2px solid tomato'};
    } else {
      this.errorStyle = {'border':'2px solid transparent'};
    }
  }

  errorClear(){
    this.errorHandling('');
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
    var result;
    if (!obj.user || !obj.pass ) {
      this.errorHandling('Missing username or password');
      result = false;
    } else {
      if (obj.pass != obj.repass && Object.keys(obj).length === 3) {
        this.errorHandling('Passwords don\'t match');
        result = false;
      } else {
        result = true;
      }
    }
    return result;
  }

  saveTokenToLocalstorage(data) {
    if (data.json().status === 'error') {
      this.errorHandling(data.json().message);
    } else {
      this.errorHandling('');
      localStorage.setItem('token', data.json().token);
      localStorage.setItem('user', data.json().user);
      this.router.navigate(['']);
    }
  }

  errorHandling(err){
    if(!err){
      this.dismissErr = ['dishmiss']
      setTimeout(function(){ 
        this.error = err;
        this.errorStyling()
       }.bind(this), 550);
    } else {
      this.dismissErr = ['']
      this.error = err;
      this.errorStyling()
      delete localStorage.token
    }
  }

  register() {
    this.registrationForm = !this.registrationForm;
    this.upAnimationClass = ['upM'];
    this.errorClear();
  }
}

