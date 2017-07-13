import {
  Directive, Component, Input, ElementRef, AfterViewInit, ViewChild, OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { HeaderComponent } from '../header/header.component';
import { DataService } from '../data.service';


@Component({
  selector: 'app-guessing',
  templateUrl: './guessing.component.html',
  styleUrls: ['./guessing.component.css']
})
export class GuessingComponent implements OnInit {

  canvasEl: HTMLCanvasElement;
  cx: any;
  userName = this.dataService.name;
  id;

  constructor(public el: ElementRef, private httpService: HttpService, private dataService: DataService ) {
    this.id = setInterval(function(){
      if(window.location.href.slice(-8) !== 'guessing'){
        clearInterval(this.id);
      }
      this.getOneRoom();
      this.getCanvas();
    }.bind(this), 1000)
  }

  getOneRoom(){
    this.httpService.enterRoom(this.dataService.id).subscribe(
    (response) => this.saveImageUrl(response),
    (error) => console.error(error)
    );
  }

  saveImageUrl(data){
    this.dataService.image_url = data.json().image_url;
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

}
