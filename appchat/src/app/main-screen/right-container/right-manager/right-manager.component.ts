import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-right-manager',
  templateUrl: './right-manager.component.html',
  styleUrls: ['./right-manager.component.scss']
})
export class RightManagerComponent implements OnInit {
  isShowChatSetting:boolean = false;
  isShowChatSharing:boolean = false;
  isShowChatPrivate:boolean = false;
  constructor(private dataService:DataService
    ) { }

  ngOnInit(): void {

  }

  public isActive(){

  }
  public getSelectedChatContent() {
    return this.dataService.getSelectedChatContent();
  }
  public isShowUserList() {
    return this.getSelectedChatContent().isGroup;
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
