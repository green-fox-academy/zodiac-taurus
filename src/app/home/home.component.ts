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
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  error: string;
  rooms = [];
  p: number = 1;
  route: string;

  constructor( private dataService: DataService, private httpService: HttpService, private router: Router ) {
    const id = setInterval(function() {
        if(window.location.href.slice(-1) !== '/'){
          clearInterval(id);
        }
        this.listRooms();
    }.bind(this), 700 );
    this.dataService.user_id = JSON.parse(atob(this.tokenSplit())).id;
  }

  ngOnInit() { }

  listRooms() {
    this.httpService.listAllRoom().subscribe(
      (response) => this.listRoom(response),
      (error) => console.log(error)
    );
  }

  listRoom(response) {
    this.rooms = [];
    response.json().forEach(function(elem) {
      if (elem.status !== 2) {
        this.rooms.push(elem);
      }
    }.bind(this));
    return this.rooms;
  }

  tokenSplit() {
    return localStorage.getItem('token').split('.')[1];
  }

  createRoomButton(newRoomName) {
    // let name = JSON.parse(atob(this.tokenSplit())).user;
    let obj = {
      name: newRoomName
    }
    this.httpService.createRoom(obj).subscribe(
      (response) => this.enterToRoom(response.json().room),
      (error) => console.error(error)
    );
    // this.listRooms();
  }

  enterToRoom(data) {
    console.log(data);
    this.dataService.id = data.id;
    this.dataService.image_url = data.image_url;
    this.dataService.name = data.name;
    this.dataService.drawing = data.drawing;
    this.dataService.current_turn = data.current_turn;
    this.dataService.guessed = data.guessed;
    this.httpService.enterRoom(this.dataService.id).subscribe(
      (response) => this.checkRoomRoute(response),
      (error) => console.log(error)
    );
  }

  checkRoomRoute(data) {
    let obj;
    if(data.json().current_turn === "drawer") {
      obj =  {
          'status': 1,
          'guesser_user_id': "",
        };
    } else {
        obj =  {
          'status': 1,
          'guesser_user_id': "",
          "time_start": ""
        };
    }
    if (this.dataService.user_id === parseInt(data.json().drawer_user_id)) {
      this.router.navigate(['draw']);
    } else {
      if (data.json().status === 0 && data.json().guesser_user_id !== this.dataService.user_id) {
        //should be renamed
        this.httpService.guesserJoin(obj, this.dataService.id).subscribe(
          (response) => console.log(response), // in progress
          (error) => console.log(error)
        );
        this.router.navigate(['guessing']);
      } else if(data.json().guesser_user_id === this.dataService.user_id) {
        this.router.navigate(['guessing']);
      } else if (data.json().status === 1){
        this.router.navigate(['/']);
      }
    }
  }
}