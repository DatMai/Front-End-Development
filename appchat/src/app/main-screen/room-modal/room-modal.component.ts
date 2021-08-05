import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-room-modal',
  templateUrl: './room-modal.component.html',
  styleUrls: ['./room-modal.component.css']
})
export class RoomModalComponent implements OnInit {
  roomName:string="";
  message:string='';
  alert:string='';
  constructor(private dataService:DataService,private wss:WebSocketService) { }

  ngOnInit(): void {
    this.dataService.message$.subscribe(
      value => this.message=value
    )
    this.dataService.alert$.subscribe(
      value => this.alert=value
    )
  }
  public createRoomChat() {
    this.wss.createRoomChat(this.roomName) ;
  }
  public joinRoomChat() {
    this.wss.joinRoomChat(this.roomName) ;
  }
  public clear() {
    this.roomName='';
    this.message='';
  }

}
