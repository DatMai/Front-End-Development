import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  selectedGroup:GroupChat={};
  selectedUser:UserModel={};
  USERLOGIN:UserModel={};
  groupChatList:GroupChat[]=this.dataService.groupChatContentExample;
  constructor(public userService:UserService,private dataService:DataService,private router:Router){

  }


  ngOnInit(): void {
    console.log(this.groupChatList);

    this.USERLOGIN=JSON.parse(sessionStorage.USERLOGIN);
    this.dataService.groupChatContent$.subscribe(value=>
      {
      this.groupChatList=value
      this.dataService.groupChatContentExample=value
      }
    );
    // this.groupChatList=this.dataService.groupChatContentExample;
    this.dataService.selectedGroup$.subscribe(value=>
      this.selectedGroup=value
    );
    this.dataService.selectedUser$.subscribe(value=>
      this.selectedUser=value
    );
  }
  public setSelectedUserChatBox(user:UserModel){
    this.dataService.selectedGroup$.next({});
    this.dataService.selectedUser$.next(user);
    this.router.navigateByUrl('home/'+user.username);
    this.selectedUser=user;
    this.userService.loadSelectedChatContent(user);
  }
  public setSelectedGroupChatBox(group:GroupChat){
    this.dataService.selectedUser$.next({});
    this.dataService.selectedGroup$.next(group);
    this.router.navigateByUrl('home/'+group.name);
    this.selectedGroup=group;
    this.userService.loadSelectedGroup(group);
  }

  public getNewMessage(groupChat:GroupChat):string{
    let chatContent =this.dataService.groupChatContentExample.find((value)=>
        value.name==groupChat.name
    );
    let listMessages=chatContent?.messages||[{message:"Chưa có tin nhắn mới",userName:"Chưa có tin nhắn mới",mine:false}];
    let lastMessage=listMessages[listMessages.length-1];
    let rs :string;
    if (lastMessage.message=="Chưa có tin nhắn mới") {
      rs="Chưa có tin nhắn mới";

    }else if(lastMessage.mine){
      rs= "You : "+lastMessage.message;

    }else{
      rs= lastMessage.userName+ " : "+lastMessage.message;
    };
    return rs;
  }
  public getNewUserMessage(user:UserModel):string{
    let chatContent =this.dataService.chatContentExample.find((value)=>
        value.usernameTo==user.username
    );
    let listMessages=chatContent?.messages||[{message:"Chưa có tin nhắn mới",userName:"Chưa có tin nhắn mới",mine:false}];
    let lastMessage=listMessages[listMessages.length-1];
    let rs :string;
    if (lastMessage.message=="Chưa có tin nhắn mới") {
      rs="Chưa có tin nhắn mới";

    }else if(lastMessage.mine){
      rs= "You : "+lastMessage.message;

    }else{
      rs= lastMessage.userName+ " : "+lastMessage.message;
    };
    return rs;
  }
}
