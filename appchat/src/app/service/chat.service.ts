import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ChatContent } from '../model/ChatContent';
import { GroupChat } from '../model/GroupChat';
import { UserModel } from '../model/userModel';
import { DataService } from './data.service';
import { WebSocketService } from './web-socket.service';
import * as $ from 'jquery';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})

export class ChatService {
  messages = new Subject<any>();

  constructor(
          private wss:WebSocketService,
          private dataService:DataService,
          private router:Router,
  ) {

  }
  public getNewMessage(chatContent:ChatContent):string{
    let listMessages=chatContent.messages||[{message:"Chưa có tin nhắn mới",userName:"Chưa có tin nhắn mới",mine:false}];
    let lastMessage=listMessages[listMessages.length-1]||{message:"Chưa có tin nhắn mới",userName:"Chưa có tin nhắn mới",mine:false};
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
  public sendTo(message:string) {
    let createAt=  new Date().toLocaleString();

    let chatContentWithThisUsermodel;
    if (message!='') {
      if(this.dataService.selectedChatContent.isGroup){
      this.wss.sendMesToGroup(this.dataService.selectedChatContent.name||'',message);
      chatContentWithThisUsermodel= this.dataService.chatContentExample.filter(
        element =>element.name==this.dataService.selectedChatContent.name
      );
      }else{
      this.wss.sendChatToPeople(this.dataService.selectedChatContent.userList||'',message);
      chatContentWithThisUsermodel= this.dataService.chatContentExample.filter(
        element =>element.userList==this.dataService.selectedChatContent.userList
      );
    }
      if (chatContentWithThisUsermodel.length==0) {
        this.dataService.chatContentExample.push({
          "name":this.dataService.selectedChatContent.name,
          "userList":this.dataService.selectedChatContent.userList,
          "messages":[{message: message, userName:this.dataService.USERLOGIN.username||"",mine: true,createAt:createAt,description:"mes"}],
          "isGroup":false,
          "isSeen":true
        });
        // this.dataService.loadSelectedChatContent(this.dataService.selectedChatContent);
      }else{
        chatContentWithThisUsermodel[0].messages?.push({message: message, userName: this.dataService.USERLOGIN.username, mine: true,createAt:createAt,description:"mes"});
      }
      this.dataService.chatContent$.next(
        this.dataService.chatContentExample
      );
    }

  }
   public isChatBoxSelected() {
    return this.dataService.getSelectedChatContent().name!=undefined;
  }
  public goToBottom(){
      let bottomPoint = document.getElementById("chatContent")||document.body;
      bottomPoint.scrollTop = bottomPoint.scrollHeight;
  }
  public setSelectedChatContent(chatContent:ChatContent){
    chatContent.isSeen=true;
    this.dataService.selectedChatContent$.next(chatContent);
    if (chatContent.isGroup) {
      this.router.navigateByUrl('home/'+chatContent.name);
    } else {
      this.router.navigateByUrl('home/'+chatContent.userList);
    }
    this.goToBottom();
  }

  public setSelectedChatContentByUserModel(usermodel:UserModel){
    let chatContent:ChatContent={};
    chatContent.name=usermodel.fullname;
    chatContent.userList=usermodel.username;
    chatContent.isGroup=false;
    chatContent.messages=[];
    chatContent.isSeen=true;
    let rs =this.dataService.chatContentExample.find(value=>
      value.userList==usermodel.username
    )||{};
    this.setSelectedChatContent(rs);
    if (rs.name==undefined) {
      rs=chatContent;
      this.dataService.chatContentExample.push(rs);
      this.wss.getPeopleChat(rs.userList,1);
      this.setSelectedChatContent(rs);
      this.dataService.chatContent$.next(this.dataService.chatContentExample);
    }else{
      this.setSelectedChatContent(rs);
    }
  }

}

