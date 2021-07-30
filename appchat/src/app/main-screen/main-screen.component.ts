import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { WebSocketService } from '../service/web-socket.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
  roomName:string="";
  constructor(public chatService:ChatService,
              private wss:WebSocketService
              ) { }

  ngOnInit(): void {
   
  }
  public createRoomChat() {
      this.chatService.createRoomChat(this.roomName) ;
      // await this.wss.receiveMessage();
      // console.log(this.wss.dataFromServer);
   }
   public joinRoomChat() {
    this.chatService.joinRoomChat(this.roomName) ;
 }
}
