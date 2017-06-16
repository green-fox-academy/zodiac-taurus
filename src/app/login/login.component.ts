import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registration = false;

  constructor() {}

  ngOnInit() {
  }

  register(){
    if(this.registration){
      this.registration = false;
    } else {
      this.registration = true;
    }
  }

}
