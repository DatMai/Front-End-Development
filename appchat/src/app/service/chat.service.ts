import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ChatContent } from '../model/ChatContent';
import { GroupChat } from '../model/GroupChat';
import { UserModel } from '../model/userModel';
import { DataService } from './data.service';
import { WebSocketService } from './web-socket.service';
@Injectable({
  providedIn: 'root'
})

export class ChatService {
  messages = new Subject<any>();

  constructor(
              private wss:WebSocketService,
              private dataService:DataService,
              private router:Router
  ) {

  }

  public createRoomChat(roomName:string) {
    this.wss.getCreateRoomMessage(roomName);
    this.wss.sendMessage1();
    this.wss.receiveMessage();
  }
  public joinRoomChat(roomName:string) {
    this.wss.getJoinRoomMessage(roomName);
    this.wss.sendMessage1();
    this.wss.receiveMessage();
  }
  public sendMesToGroup(nameRoom:string,message:string) {
    this.wss.sendMessage(JSON.stringify({
      "action": "onchat",
      "data": {
        "event": "SEND_CHAT",
        "data": {
          "type": "room",
          "to": nameRoom,
          "mes": message
        }
      }
    }));
  }
  public getNewMessage(chatContent:ChatContent):string{
    let chatContent1 =this.dataService.chatContentExample.find((value)=>
        chatContent.isGroup&&value.name==chatContent.name||
        !chatContent.isGroup&&value.userList==chatContent.userList
    );
    let listMessages=chatContent1?.messages||[{message:"Chưa có tin nhắn mới",userName:"Chưa có tin nhắn mới",mine:false}];
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
  public sendTo(message:string) {
    if(this.dataService.selectedChatContent.isGroup)
    this.sendMesToGroup(this.dataService.selectedChatContent.name||'',message);
    else
    this.wss.sendOne(this.dataService.selectedChatContent.userList||'',message);
    let chatContentWithThisUsermodel= this.dataService.chatContentExample.filter(
      element =>element.name==this.dataService.selectedChatContent.name
    );
    if (chatContentWithThisUsermodel.length==0) {
      this.dataService.chatContentExample.push({
        "name":this.dataService.selectedChatContent.name,
        "userList":this.dataService.selectedChatContent.userList,
        "messages":[{message: message, userName: 'me', mine: true}],
        "isGroup":false
      });
      // this.dataService.loadSelectedChatContent(this.dataService.selectedChatContent);
    }else{
      if (message!='') {
        chatContentWithThisUsermodel[0].messages?.push({message: message, userName: 'me', mine: true});
      }
    }
    this.dataService.chatContent$.next(
      this.dataService.chatContentExample
    );
  }
   public isChatBoxSelected() {
    return this.dataService.getSelectedChatContent().name!=undefined;
  }
  public setSelectedChatContent(chatContent:ChatContent){
    this.dataService.selectedChatContent$.next(chatContent);
    if (chatContent.isGroup) {
      this.router.navigateByUrl('home/'+chatContent.name);
    } else {
      this.router.navigateByUrl('home/'+chatContent.userList);

    }
  }

}
