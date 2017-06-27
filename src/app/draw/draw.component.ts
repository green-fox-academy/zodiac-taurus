import {
  Directive, Component, Input, ElementRef, AfterViewInit, ViewChild, OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Renderer } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CanvasComponent } from '../canvas/canvas.component';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css'],
  providers: [ FormsModule, CanvasComponent ]
})

@Directive({ selector: 'myCanvas' })

export class DrawComponent implements OnInit {

  colors = ['yellow', 'orange', 'red', 'black', 'purple', 'blue', 'green', 'white'];

  constructor(public el: ElementRef, public canvas: CanvasComponent, private render:Renderer) {
   }

  ngOnInit() {
  }

  // onClick(event) {
  //   var target = event.target;
  //   target.className += ' active'
  //   console.info(target.className)
  // }
}

