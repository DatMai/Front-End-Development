import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { WebSocketService } from '../service/web-socket.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
  roomName:string="";
  constructor(public chatService:ChatService,
              private userService:UserService,private dataService:DataService,private wss:WebSocketService
              ) { }
  ngOnInit(): void {
  
  }

  public createRoomChat() {
      this.chatService.createRoomChat(this.roomName) ;
      // this.userService.loadListFriend(this.dataService.USERLOGIN);
   }
   public joinRoomChat() {
    this.chatService.joinRoomChat(this.roomName) ;
 }
}
