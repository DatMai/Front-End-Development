import { Component, Input, OnInit, Output } from '@angular/core';
import { ChatContent } from 'src/app/model/ChatContent';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-right-container',
  templateUrl: './right-container.component.html',
  styleUrls: ['./right-container.component.css']
})
export class RightContainerComponent implements OnInit {

  constructor(private dataService:DataService,private chatService:ChatService) {
  }

  ngOnInit(): void {
  }

  public isChatBoxSelected() {
    return this.chatService.isChatBoxSelected();
  }
}
