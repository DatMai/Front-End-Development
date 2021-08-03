import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ChatContent } from '../model/ChatContent';
import { GroupChat } from '../model/GroupChat';
import { UserModel } from '../model/userModel';
import { DataService } from './data.service';
import { WebSocketService } from './web-socket.service';
import * as $ from 'jquery';
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

  public reLogin(username:string,code:string){

    this.wss.getReLoginMessage(username,code);
    this.wss.sendMessage1();
    // this.wss.receiveMessage();

  }
  public getPeopleChatMessage(username:string,page:number){
    this.wss.getPeopleChatMessage(username,page);
    this.dataService.chatContentUserName=username;
    // console.log(this.dataService.chatContentUserName);
    this.wss.sendMessage1();
  }
  public createRoomChat(roomName:string) {
    this.wss.getCreateRoomMessage(roomName);
    this.wss.sendMessage1();
    // this.wss.receiveMessage();
  }
  public joinRoomChat(roomName:string) {
    this.wss.getJoinRoomMessage(roomName);
    this.wss.sendMessage1();
    // this.wss.receiveMessage();
  }
  public getRoomChatMes(roomName:string,page:number){
    this.wss.getRoomChatMessage(roomName,page);
    this.wss.sendMessage1();
    // this.wss.receiveMessage();

  }
  public checkUser(user:UserModel){
    this.wss.getCheckUserMessage(user.username||"");
    this.dataService.userIsChecking=user
    this.wss.sendMessage1();
  }

  public sendMesToGroup(nameRoom:string,message:string) {
    this.wss.getSendMesToGroup(nameRoom,message);
    this.wss.sendMessage1();
  }
  public sendChatToPeople(nameto:string,message:string) {
    this.wss.getSendChatToPeople(nameto,message)
    this.wss.sendMessage1();
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
    let chatContentWithThisUsermodel;
    if (message!='') {
      if(this.dataService.selectedChatContent.isGroup){
      this.sendMesToGroup(this.dataService.selectedChatContent.name||'',message);
      chatContentWithThisUsermodel= this.dataService.chatContentExample.filter(
        element =>element.name==this.dataService.selectedChatContent.name
      );
      }else{
      this.sendChatToPeople(this.dataService.selectedChatContent.userList||'',message);
      chatContentWithThisUsermodel= this.dataService.chatContentExample.filter(
        element =>element.userList==this.dataService.selectedChatContent.userList
      );
    }
      if (chatContentWithThisUsermodel.length==0) {
        this.dataService.chatContentExample.push({
          "name":this.dataService.selectedChatContent.name,
          "userList":this.dataService.selectedChatContent.userList,
          "messages":[{message: message, userName:this.dataService.USERLOGIN.username||"",mine: true,createAt:"now",description:"mes"}],
          "isGroup":false,
          "isSeen":true
        });
        // this.dataService.loadSelectedChatContent(this.dataService.selectedChatContent);
      }else{
        chatContentWithThisUsermodel[0].messages?.push({message: message, userName: this.dataService.USERLOGIN.username, mine: true,createAt:"now",description:"mes"});
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
    window.onclick=function(){
      let bottomPoint = document.getElementById("chatContent")||document.body;
      bottomPoint.scrollTop = bottomPoint.scrollHeight;
    }
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
  public sendTypingMessage(message:string){
    if(message!=''){
    if(this.dataService.selectedChatContent.isGroup)
      this.sendMesToGroup(this.dataService.selectedChatContent.name||'','');
      else
      this.sendChatToPeople(this.dataService.selectedChatContent.userList||'','');
    }
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
    if (rs.name==undefined) {
      this.dataService.chatContentExample.push(chatContent);
      this.getPeopleChatMessage(chatContent.userList,1);
      this.setSelectedChatContent(chatContent);
      console.log( this.dataService.chatContentExample);
      this.dataService.chatContent$.next(this.dataService.chatContentExample);
    }else{
      this.setSelectedChatContent(rs);
    }

  }
}

