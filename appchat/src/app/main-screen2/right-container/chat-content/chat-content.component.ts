import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ChatContent } from 'src/app/model/ChatContent';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';

import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css']
})
export class ChatContentComponent implements OnInit{

  constructor(
    private dataService:DataService,
    private chatService:ChatService
    ){ }
  ngOnInit(): void {
  }
  public getSelectedChatContent() {
    return this.dataService.getSelectedChatContent();
  }
  public getSelectedUser() { 
    return this.dataService.getSelectedUser();
  }
  public getSelectedGroup() { 
    return this.dataService.getSelectedGroup();
  }
  public isUserSelected() {
    return this.chatService.isUserSelected();
  }
  public isGroupSelected() {
    return this.chatService.isGroupSelected();
  }
  public goToBottom(){
    let bottomPoint =(document.getElementById('chatContent')||document.body);
    bottomPoint.scrollTo(0,bottomPoint.scrollHeight);
  }
}
