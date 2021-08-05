import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-manager',
  templateUrl: './right-manager.component.html',
  styleUrls: ['./right-manager.component.scss']
})
export class RightManagerComponent implements OnInit {
  isShowChatSetting:boolean = false;
  isShowChatSharing:boolean = false;
  isShowChatPrivate:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  public isActive(){

  }

  public showChatSetting(){
    this.isShowChatSetting = !this.isShowChatSetting
  }
  public showChatSharing(){
    this.isShowChatSharing = !this.isShowChatSharing
  }
  public showChatPrivate(){
    this.isShowChatPrivate = !this.isShowChatPrivate
  }

}
