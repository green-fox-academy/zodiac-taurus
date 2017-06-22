import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../http.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../home/home.component.css']
})
export class HeaderComponent implements OnInit {
  name: string;
  constructor(private httpService: HttpService, private router: Router) {

    this.name = localStorage.getItem('user');

  }

  ngOnInit() {
  }

  logoutEvent() {
    localStorage.clear();
    // console.log('localStorage deleted: ', localStorage);
    this.router.navigate(['login']);
  }

}
