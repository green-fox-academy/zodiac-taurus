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
  timeIsUp = false;
  time;
  canGuess = true;

  constructor(public el: ElementRef, private httpService: HttpService, private dataService: DataService ) {
    this.intervall();
    this.id = setInterval(function(){
      if(window.location.href.slice(-8) !== 'guessing' || this.timeIsUp){
        clearInterval(this.id);
      }
      console.log("fut");
      this.getOneRoom();
      this.getCanvas();
      this.intervall();
    }.bind(this), 1000)
  }

  intervall() {
    if(this.dataService.current_turn === "guesser") {
      const id = setInterval(function() {
        console.log("Fut?")
        if(window.location.href.slice(-4) !== 'guessing' || this.timeIsUp){
          clearInterval(id);
        }    
        this.pingServer(); 
      }.bind(this), 1000 );
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

  secondSetter(data){
    if(data.remained ) { 
      this.time = data.remained;
    } else if(data.remained === 0){
      this.time = 0;
      setTimeout(function(){this.time = "Time is up!!"}, 800);
      this.timeIsUp = true;
      this.canGuess = false;
    } else {
      this.time = "";
      this.timeIsUp = true;
      this.canGuess = false;
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

    let image = new Image();
    image.onload = function() {
      this.cx.drawImage(image, 0, 0, 560, 420);
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
      this.guessed = "Congratulation! Your guess is right."
      this.timeIsUp = true;
      this.canGuess = false;
      this.time = "";

    } else {
      this.guessed = "Your guess is wrong!"
    }
  }

}







