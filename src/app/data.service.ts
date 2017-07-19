import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  
  public id: string;
  public name: string;
  public owner: string;
  public image_url: string;
  public user_id: number;
  public drawing: string;
  public current_turn: string;
  public guessed: boolean;

  public constructor() { }
}