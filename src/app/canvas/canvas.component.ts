import {
  Directive, Component, Input, ElementRef, AfterViewInit, ViewChild, OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import {Observable} from 'rxjs/Observable';
import { HttpService } from '../http.service';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  providers: [ FormsModule ]
})

@Directive({ selector: 'myCanvas' })

export class CanvasComponent implements OnInit {
  @Input() public width = 560;
  @Input() public height = 420;

  cx:any;
  lineWeight = 2;
  canvasEl: HTMLCanvasElement;
  color = 'rgb(0,0,0)';

  constructor(public el: ElementRef, private httpService: HttpService) {    
    console.log(el.nativeElement);
  }

  ngOnInit() {
    console.log(this.el.nativeElement.children[0]);
    console.log(this.el.nativeElement.querySelector('canvas'));
    this.canvasEl = this.el.nativeElement.querySelector('canvas');
    this.cx = this.canvasEl.getContext('2d');
  }

  setLineWeight(number){ 
    console.log("canv component", this);
    this.ngOnInit()
    this.cx.lineWidth = number;
    this.lineWeight = number;
  }

  setLineColor(color){
    this.ngOnInit()
    this.cx.strokeStyle = color;
    this.color = color;
  }

  public ngAfterViewInit() {
    this.ngOnInit()
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

    submitEvent() {
    this.ngOnInit();
    const dataURL = this.canvasEl.toDataURL();
    const dataURLObj = {
      "image_data": dataURL
    }

    this.httpService.sendImagetoServer(dataURLObj).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}

