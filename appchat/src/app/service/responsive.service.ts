import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  isClickShowLeftContainer:boolean = true;
  constructor() { }

  public isMobileRes(index:number){
    if(window.innerWidth <= index){
      return true;
    }else{
      return false;
    }
  }
  public isShowLeftContainer(){
    if(window.innerWidth > 1024){
      return true;
    }
    if(window.innerWidth <= 1024 && this.isClickShowLeftContainer == true ){
      return true;
    }
    return false;
  }
  public isShowOverlayLeft(){
    if(window.innerWidth <= 1024 && this.isClickShowLeftContainer == true ){
      return true;
    }else
    return false;
  }

}
