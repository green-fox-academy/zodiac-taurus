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

  constructor(private httpService: HttpService) {

    this.httpService.listAllRoom().subscribe(
      (response) => console.log(response),
      // (error) => this.error = 'Authentication error'
      (error) => console.log(error)
    );

  }

  ngOnInit() { }

  createRoom() {
    console.log('create room');
  }

}
