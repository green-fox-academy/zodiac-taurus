import {
  Directive, Component, Input, ElementRef, AfterViewInit, ViewChild, OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Renderer } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CanvasComponent } from '../canvas/canvas.component';
import { MessagingService } from '../messaging.service';
import { DataService } from '../data.service';
import { CapitalizefirstPipe } from '../capitalizefirst.pipe';
import { HttpService } from '../http.service';



@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css'],
  providers: [ FormsModule, CanvasComponent, MessagingService ]
})

@Directive({ selector: 'myCanvas' })

export class DrawComponent implements OnInit {

  colors = ['yellow', 'orange', 'red', 'black', 'purple', 'blue', 'green', 'white'];

  roomName =  this.dataService.name;
  guessDraw = this.dataService.drawing;
  remainedSeconds;
  haveTime = true;
  canvasEl;
  cx;

  constructor( private dataService: DataService, public messaging: MessagingService,
   public el: ElementRef, public canvas: CanvasComponent,
    private render:Renderer, private httpService: HttpService) {
      this.intervall();
  }

  intervall() {
    if(this.dataService.current_turn === "drawer") {
      const id = setInterval(function() {
        if(window.location.href.slice(-4) !== 'draw' || this.haveTime === false){
          clearInterval(id);
        }    
        this.pingServer(); 
      }.bind(this), 1000 );
    } else {
      this.haveTime = false;
      this.remainedSeconds = "Sended..";
    }
  }

  ngOnInit() {
    this.getCanvas();
  }

  sended() {
    this.haveTime = false;
    this.remainedSeconds = "Sended..";

    let obj = {
      "current_turn": "guesser",
      "time_start": ""
    }
    this.httpService.guesserJoin(obj, this.dataService.id).subscribe(
      (response) => this.setCurrentTurn(), // in progress
      (error) => console.log(error)
    );
    this.dataService.current_turn = "guesser";
  }

  setCurrentTurn() {
    this.dataService.current_turn = "guesser";
  }

  pingServer(){
    if(this.dataService.current_turn === "drawer") {
      this.httpService.pingTime(this.dataService.id).subscribe(
        (response) => this.secondSetter(response.json()),
        (error) => console.log(error)
      );
    }
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

  secondSetter(data) {
    console.log(data);
    if(data.remained ) {
      this.remainedSeconds = data.remained;
    } else if (data.remained === 0) {
      this.remainedSeconds = data.remained;
      this.canvas.submitEvent()
    } else if (data.status) {
      this.sended();
    }
  }

  setColor(color){
    this.messaging.publish(new updateColor(color));
  }

  setLineWeight(weight){
    this.messaging.publish(new updateLineWeight(weight));
  }

  resetCanvas(){
    this.messaging.publish(new reset());
  }
}

export class updateColor{
  constructor(public color: string) { }
}

export class updateLineWeight{
  constructor(public weight: number) { }
}

export class reset{
  constructor() { }
}