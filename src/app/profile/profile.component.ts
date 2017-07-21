import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { CapitalizefirstPipe } from '../capitalizefirst.pipe';
import { HeaderComponent } from '../header/header.component';
import { LoginCheckService } from '../login-check.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name:string;
  score:number;
  edit:boolean = false;
  hide;
  myRooms;
  constructor(private httpService: HttpService) { 
    this.getUserDetails()
  }

  ngOnInit() {
  }

  getUserDetails(){
    this.httpService.getUser().subscribe(
      (response) => this.setDetails(response),
      (error) => console.log(error)
    );
  }

  setDetails(data){
    console.log(data);
    const resData = data.json();
    this.myRooms = resData.myRooms;
    this.name = resData.name;
    this.score = resData.score;
  }

  editName(){
    if(this.edit){
      this.hide = ['hide'];
      setTimeout(function(){
        this.edit = !this.edit
       }.bind(this), 800);
    } else {
      this.hide = ['up'];
      this.edit = !this.edit
    }
    
  }
}
