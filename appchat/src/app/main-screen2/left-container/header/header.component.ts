import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  roomName:string="";
  constructor(public chatService:ChatService,
              private wss:WebSocketService
              ) { }

  ngOnInit(): void {
    // this.createRoomChat();
  }
  public async createRoomChat() {
      this.chatService.createRoomChat(this.roomName) ;
      await this.wss.receiveMessage();
      console.log(this.wss.dataFromServer);
   }
   public joinRoomChat() {
    this.chatService.joinRoomChat(this.roomName) ;
 }
}
