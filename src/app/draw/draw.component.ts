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

  constructor( private dataService: DataService, public messaging: MessagingService, public el: ElementRef, public canvas: CanvasComponent, private render:Renderer) {
  }

  ngOnInit() {
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