import { Component, OnInit } from '@angular/core';
import { ChatContent } from 'src/app/model/ChatContent';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  USERLOGIN:UserModel={};
  constructor(private dataService:DataService,private userService:UserService,private chatService:ChatService) { }

  ngOnInit(): void {
    this.USERLOGIN=JSON.parse(sessionStorage.USERLOGIN);
  }
  public isShowListFriend() {
    return this.dataService.isShowListFriend;
  }
  public isShowSetting(){
    return this.dataService.isShowSetting;
  }
  public getListFriends() {
    return this.userService.getListFriends(this.USERLOGIN);
  }
  public getChatContentExample() {
    return this.dataService.getChatContentExample();
  }

  public setSelectedChatContent(chatContent:ChatContent){
    this.chatService.setSelectedChatContent(chatContent);
  }

  public goToBottom(){
    let bottomPoint =(document.getElementById('chatContent')||document.body);
    bottomPoint.scrollTo(0,bottomPoint.scrollHeight);
  }
  public getNewMessage(chatContent:ChatContent):string{
    return this.chatService.getNewMessage(chatContent);
  }

}
