import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  // isMobileRes:boolean =false;
  constructor() { }

  public isMobileRes(index:number){
    if(window.innerWidth <= index){
      return true;
    }else{
      return false;
    }
  }
}
