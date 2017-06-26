import {
  Directive, Component, Input, ElementRef, AfterViewInit, ViewChild, OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css'],
  providers: [ FormsModule ]
})

@Directive({ selector: 'myCanvas' })

export class DrawComponent implements OnInit {
  @Input() public width = 900;
  @Input() public height = 400;

  cx;
  lineWeight = 1;
  canvasEl: HTMLCanvasElement;
  color = 'rgb(0,0,0)';
  drawThis = ['an Elephant', 'a House', 'the Mona Lisa', 'Stairs', 'a Boy', 'a Girl', 'a Heart', 'a Bike', 'a Fox'];
  rand = this.drawThis[Math.floor(Math.random() * this.drawThis.length)];  
  //style = "{'black': true}"
  constructor(public el: ElementRef) {    
    console.log(el.nativeElement);

   }

  ngOnInit() {
    console.log(this.el.nativeElement.children[0]);
    console.log(this.el.nativeElement.querySelector('canvas'));
    this.canvasEl = this.el.nativeElement.querySelector('canvas');
    this.cx = this.canvasEl.getContext('2d');
  }

  setLineWeight(){ 
    this.cx.lineWidth = this.lineWeight;
  }

  setLineColor(){
    this.cx.strokeStyle = this.color;
  }

  public ngAfterViewInit() {
    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;

    this.cx.lineWidth = this.lineWeight;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = this.color;

    this.captureEvents(this.canvasEl);
  }
  private captureEvents(canvasEl: HTMLCanvasElement) {
  Observable
    .fromEvent(canvasEl, 'mousedown')
    .switchMap((e) => {
      return Observable
        .fromEvent(canvasEl, 'mousemove')
        .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))   
        .pairwise()
    })
    .subscribe((res: [MouseEvent, MouseEvent]) => {
      const rect = canvasEl.getBoundingClientRect();
      const prevPos = {
        x: res[0].clientX - rect.left,
        y: res[0].clientY - rect.top
      };
      const currentPos = {
        x: res[1].clientX - rect.left,
        y: res[1].clientY - rect.top
      };

      this.drawOnCanvas(prevPos, currentPos);
    });
  }
  private drawOnCanvas(
  prevPos: { x: number, y: number }, 
  currentPos: { x: number, y: number }
) {
  if (!this.cx) { return; }
  this.cx.beginPath();
  if (prevPos) {
    this.cx.moveTo(prevPos.x, prevPos.y);
    this.cx.lineTo(currentPos.x, currentPos.y);
    this.cx.stroke();
  }
}
}

