import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { HeaderComponent } from '../header/header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from '../data.service'; //testData
import { CapitalizefirstPipe } from '../capitalizefirst.pipe';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  error: string;
  rooms = [];
  p: number = 1;
  route: string;

  constructor( private dataService: DataService, private httpService: HttpService, private router: Router ) {

    this.listRooms();

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
    let name = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).user;
    let obj = {
      name: name
    }
    this.httpService.createRoom(obj).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.listRooms();
  }

  enterToRoom(data) {
    this.dataService.id = data.id;
    this.dataService.image_url = data.image_url;
    this.dataService.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    this.httpService.enterRoom(this.dataService.id).subscribe(
      (response) => this.checkRoomRoute(response),
      (error) => console.log(error)
    );
  }

  checkRoomRoute(data) {
    if ( data.json().image_url === null ) {
      this.router.navigate(['draw']);
    } else {
      this.router.navigate(['guessing']);
    }
  }
}













