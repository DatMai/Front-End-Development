import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/userModel';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  roomName:string="";
  USERLOGIN:UserModel={}
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.USERLOGIN=this.dataService.USERLOGIN;
  }
  public showListChatBox() {
    this.dataService.isShowListChatBox=true;
    this.dataService.isShowListFriend=false;
  }
  public showListFriend() {
    this.dataService.isShowListFriend=true;
    this.dataService.isShowListChatBox=false;
  }
  public isShowListChatBox() {
   return  this.dataService.isShowListChatBox;
  }
  public isShowListFriend() {
    return  this.dataService.isShowListFriend;
   }
}
