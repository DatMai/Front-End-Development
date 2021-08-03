import { Component, OnInit } from '@angular/core';
import { ChatContent } from 'src/app/model/ChatContent';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  USERLOGIN:UserModel={};
  constructor(private dataService:DataService,private userService:UserService,private wss:WebSocketService,private chatService:ChatService) { }

  ngOnInit(): void {
    this.USERLOGIN=JSON.parse(sessionStorage.USERLOGIN);
  }
  public logout() {
    this.userService.logout();
    // console.log(this.dataService.reLoginCode);
    // this.wss.relogin();

    // this.wss.getReLoginMessage("doan",this.dataService.reLoginCode);
    // this.wss.sendMessage1();
    // this.wss.receiveMessage();
  }
  public checkUser(user:UserModel) {
    return this.chatService.checkUser(user);
  }
  public isShowListChatBox() {
    return this.dataService.isShowListChatBox;
  }
  public isShowListFriend() {
    return this.dataService.isShowListFriend;
  }
  public isShowSetting(){
    return this.dataService.isShowSetting;
  }
  public getListFriends() {
    return this.dataService.getListFriends();
  }
  public getUSERLOGIN() {
    return this.dataService.USERLOGIN;
  }
  public getChatContentExample() {
    return this.dataService.getChatContentExample();
  }

  public setSelectedChatContent(chatContent:ChatContent){
    this.chatService.setSelectedChatContent(chatContent);
  }
  public setSelectedChatContentByUserModel(usermodel:UserModel){
    this.checkUser(usermodel);
    this.chatService.setSelectedChatContentByUserModel(usermodel);
  }

  public goToBottom(){
    let bottomPoint =(document.getElementById('chatContent')||document.body);
    bottomPoint.scrollTo(0,bottomPoint.scrollHeight);
  }
  public getNewMessage(chatContent:ChatContent):string{
    return this.chatService.getNewMessage(chatContent);
  }

}
