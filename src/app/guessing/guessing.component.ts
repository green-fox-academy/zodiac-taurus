import {
  Directive, Component, Input, ElementRef, AfterViewInit, ViewChild, OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { HeaderComponent } from '../header/header.component';
import { DataService } from '../data.service';


@Component({
  selector: 'app-guessing',
  templateUrl: './guessing.component.html',
  styleUrls: ['./guessing.component.css'],
  providers: [ FormsModule ]
})
export class GuessingComponent implements OnInit {

  canvasEl: HTMLCanvasElement;
  cx: any;
  userName = this.dataService.name;
  roomId = this.dataService.id;
  guessed;
  id;
  width;
  height;
  timeIsUp = false;
  time;
  canGuess = true;
  rightGuess = false;

  constructor(public el: ElementRef, private httpService: HttpService, private dataService: DataService ) {
    this.intervall();
    this.id = setInterval(function(){
      if(window.location.href.slice(-8) !== 'guessing' || this.timeIsUp){
        clearInterval(this.id);
      }
      this.getOneRoom();
      this.getCanvas();
      this.intervall();
    }.bind(this), 1000)
  }

  intervall() {
    console.log(this.dataService.guessed);
    if(this.dataService.current_turn === "guesser" && this.dataService.guessed === false) {
      const id = setInterval(function() {
        if(window.location.href.slice(-4) !== 'guessing' || this.timeIsUp){
          clearInterval(id);
        }
        this.pingServer();
      }.bind(this), 1000 );
    } else if( this.dataService.guessed === true ){
        this.time = "";
        this.timeIsUp = true;
        this.canGuess = false;
    }
  }

  pingServer(){
    if(this.dataService.current_turn === "guesser") {
      this.httpService.pingTime(this.dataService.id).subscribe(
        (response) => this.secondSetter(response.json()),
        (error) => console.log(error)
      );
    }
  }

  setRoomToEnded(){
    const obj = {
      "status": 2
    };
    this.httpService.guesserJoin(obj, this.dataService.id).subscribe(
      (response) => console.info(response),
      (error) => console.error(error)
    );
  }

  secondSetter(data){
    console.log(data);
    if(this.rightGuess === false) {
      if(data.remained ) { 
        this.time = data.remained;
      } else if(data.remained === 0){
        this.time = 0;
        setTimeout(function(){this.time = "Time is up!!"}, 800);
        this.timeIsUp = true;
        this.canGuess = false;
        this.setRoomToEnded()
      } else {
        this.time = "";
        this.timeIsUp = true;
        this.canGuess = false;
      }
    }
  }

  getOneRoom(){
    this.httpService.enterRoom(this.dataService.id).subscribe(
    (response) => this.saveDatas(response),
    (error) => console.error(error)
    );
  }

  saveDatas(data){
    this.dataService.image_url = data.json().image_url;
    this.dataService.current_turn = data.json().current_turn;
  }

  ngOnInit() {
    this.getCanvas();
  }

  getCanvas() {
    this.canvasEl = this.el.nativeElement.querySelector('canvas');
    this.cx = this.canvasEl.getContext('2d');
    this.width = this.canvasEl.clientWidth;
    this.height = this.canvasEl.clientHeight;


    let image = new Image();
    image.onload = function() {
      this.cx.drawImage(image, 0, 0, this.width, this.height);
    }.bind(this);

    image.src = this.dataService.image_url;
  }

  guessPost(guess) {
    const obj = {
      "guess": guess
    };
    this.httpService.sendGuessPost(obj, this.roomId).subscribe(
      (response) => this.guessedOrNot(response),
      (error) => console.log(error)
    );
  }

  guessedOrNot(data) {
    if(data.json().guessed) {
      this.rightGuess = true;
      this.guessed = "Congratulation! Your guess is right."
      this.timeIsUp = true;
      this.canGuess = false;
      this.time = "";
      this.setRoomToEnded()
    } else {
      this.guessed = "Your guess is wrong!"
    }
  }

}







