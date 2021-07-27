import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService, iDataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit,iDataService {
  selectedGroup:GroupChat={};
  selectedUser:UserModel={};
  USERLOGIN:UserModel={};
  groupChatList:GroupChat[]=this.dataService.groupChatContentExample;
  constructor(private chatService:ChatService,public userService:UserService,private dataService:DataService,private router:Router){

  }

  ngOnInit(): void {
    this.USERLOGIN=JSON.parse(sessionStorage.USERLOGIN);
  }
  public getSelectedUser() { 
    return this.dataService.getSelectedUser();
  }
  public getSelectedGroup() { 
    return this.dataService.getSelectedGroup();
  }
  public setSelectedUserChatBox(user:UserModel){
    this.chatService.setSelectedUserChatBox(user);
  }
  public setSelectedGroupChatBox(group:GroupChat){
    this.chatService.setSelectedGroupChatBox(group);
  }
  public goToBottom(){
    let bottomPoint =(document.getElementById('chatContent')||document.body);
    bottomPoint.scrollTo(0,bottomPoint.scrollHeight);
  }

  public getNewGroupMessage(groupChat:GroupChat):string{
    return this.chatService.getNewGroupMessage(groupChat);
  }
  public getNewUserMessage(user:UserModel):string{
    return this.chatService.getNewUserMessage(user);
  }
}
