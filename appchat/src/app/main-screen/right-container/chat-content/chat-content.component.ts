import { Component, Input, OnInit } from '@angular/core';
import { ChatContent } from 'src/app/model/ChatContent';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { DataService } from 'src/app/service/data.service';

import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css']
})
export class ChatContentComponent implements OnInit {
  @Input() selectedUser:UserModel ={};
  @Input() chatContent:ChatContent[] =[];
  @Input() USERLOGIN:UserModel ={};
  selectedGroup:GroupChat ={};
  selectedChatContent:ChatContent ={};
  constructor(private wss:WebSocketService,private dataService:DataService){ }

  ngOnInit(): void {
    this.dataService.selectedGroup$.subscribe(value=>
      {
      this.selectedGroup=value;
      }
    );
    this.dataService.selectedUser$.subscribe(value=>
      {
      this.selectedUser=value;
      }
    );
    this.dataService.selectedChatContent$.subscribe(value=>

      this.selectedChatContent=value

    );
    this.receiveMes();
  }
  public async receiveMes() {
    await this.wss.receiveMessage();

  }
  public loadSelectedChatContent() {
   let rs = this.chatContent.filter(
       element =>element.usernameTo==this.selectedUser.username);
    if (rs.length==0) {
      this.dataService.selectedChatContent$.next({
        "usernameTo":this.selectedUser.username,
        "messages":[]
      });
    }else
    this.dataService.selectedChatContent$.next(
        rs[0]
    );
    }
  public loadSelectedGroupChatContent() {
    let rs = this.chatContent.filter(
      element =>element.usernameTo==this.selectedUser.username);
      if (rs.length==0) {
        this.dataService.selectedChatContent$.next({
        "usernameTo":this.selectedUser.username,
        "messages":[]
        });
      }else
      this.dataService.selectedChatContent$.next(
        rs[0]
      );
  }



}
