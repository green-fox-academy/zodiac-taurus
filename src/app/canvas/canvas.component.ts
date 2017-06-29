import {
  Directive, Component, Input, ElementRef, AfterViewInit, ViewChild, OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { updateColor, updateLineWeight, reset } from '../draw/draw.component'
import { HeaderComponent } from '../header/header.component';
import { MessagingService } from '../messaging.service';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  providers: [ FormsModule, MessagingService ]
})

@Directive({ selector: 'myCanvas' })

export class CanvasComponent implements OnInit {
  @Input() public width = 560;
  @Input() public height = 420;

  cx:any;
  lineWeight = 2;
  canvasEl: HTMLCanvasElement;
  color = 'rgb(0,0,0)';

  subscription: Subscription;

  constructor( private dataService: DataService, public messaging: MessagingService, public el: ElementRef, private httpService: HttpService) {
    this.colorSubscribe();
    this.weightSubscribe();
    this.resetSubscribe();
   }

  ngOnInit() {
    this.getCanvas();
  }

  getCanvas(){
    this.canvasEl = this.el.nativeElement.querySelector('canvas');
    this.cx = this.canvasEl.getContext('2d');
  }

  colorSubscribe(){
     this.messaging.of(updateColor).subscribe(message => {
      this.setLineColor(message.color);
    })
  }
  
  weightSubscribe(){
    this.messaging.of(updateLineWeight).subscribe(message => {
    this.setLineWeight(message.weight);
    })
  }

  resetSubscribe(){
    this.messaging.of(reset).subscribe(message => {
      this.ngAfterViewInit()
    })
  }

  setLineWeight(number){ 
    this.getCanvas();
    this.cx.lineWidth = number;
    this.lineWeight = number;
  }

  setLineColor(color){
    this.getCanvas();
    this.cx.strokeStyle = color;
    this.color = color;
  }

  public ngAfterViewInit() {
    this.getCanvas();
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

  // submitEvent() {
  //   console.log('submit on Canvas: ', this.dataService.id);
  // }

  submitEvent() {
    this.ngOnInit();
    const dataURL = this.canvasEl.toDataURL(); // image data
    const dataURLObj = {
      "image_data": dataURL
    }

    this.httpService.sendImagetoServer(dataURLObj).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

}

