import { Component, OnInit } from '@angular/core';
// import { Response} from '@angular/http';

import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  error: string;
  rooms = [];

  constructor(private httpService: HttpService) {

    // this.httpService.listAllRoom().subscribe(
    //   (response) => this.listRoom(response),
    //   // (error) => this.error = 'Authentication error'
    //   (error) => console.log(error)
    // );
  this.listRooms();

  }

  ngOnInit() { }

  listRooms() {
    this.httpService.listAllRoom().subscribe(
      (response) => this.listRoom(response),
      (error) => console.log(error)
      // (error) => this.error = 'Authentication error'
    );
  }

  listRoom(response) {
    this.rooms = response.json();
    return this.rooms;
  }

  createRoomButton() {
    let name = "Jim Doe's room"
    let obj = {
      name: name
    }
    this.httpService.createRoom(obj).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    this.listRooms();
  }

}
