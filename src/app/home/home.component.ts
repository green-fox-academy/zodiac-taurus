import { Component, OnInit } from '@angular/core';
import { Response} from '@angular/http';

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

    this.httpService.listAllRoom().subscribe(
      (response) => this.listRoom(response),
      // (error) => this.error = 'Authentication error'
      (error) => console.log(error)
    );

  }

  ngOnInit() { }

  listRoom(response) {
    this.rooms = response.json();
    console.log(this.rooms);
    return this.rooms;
  }

}
