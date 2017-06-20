import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  error: string;
  rooms = [];
  name: string;

  constructor(private httpService: HttpService, private router: Router) {

    this.listRooms();
    this.name = localStorage.getItem('user');
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('user'));
  }

  ngOnInit() { }

  listRooms() {
    this.httpService.listAllRoom().subscribe(
      (response) => this.listRoom(response),
      (error) => console.log(error)
    );
  }

  listRoom(response) {
    this.rooms = response.json();
    return this.rooms;
  }

  createRoomButton() {
    let name = localStorage.getItem('user') + " 's room";
    let obj = {
      name: name
    }
    this.httpService.createRoom(obj).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.listRooms();
  }

  logoutEvent() {
    localStorage.clear();
    console.log('localStorage deleted: ', localStorage);
    this.router.navigate(['login']);
  }

}
