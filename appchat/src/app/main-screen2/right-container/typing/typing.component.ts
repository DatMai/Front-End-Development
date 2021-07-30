import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.css']
})
export class TypingComponent implements OnInit {

  message:string='';

  constructor(private dataService:DataService,
              private chatService:ChatService) { }

  ngOnInit(): void {

  }
  public isUserSelected() {
   return this.chatService.isUserSelected();
  }
  public isGroupSelected() {
    return this.chatService.isGroupSelected();
  }
  public sendTo() {
    this.chatService.sendTo(this.message);
    this.message='';
  }
  public sendToGroup() {
    this.chatService.sendToGroup(this.message);
    this.message='';
  }

}
