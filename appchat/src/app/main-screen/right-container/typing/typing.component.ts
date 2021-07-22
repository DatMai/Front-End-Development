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
  @Input() selectedUser:UserModel ={};
  selectedGroup:GroupChat ={};
  constructor(private userService:UserService,private wss:WebSocketService,private dataService:DataService,private chatService:ChatService) { }

  ngOnInit(): void {
    this.dataService.selectedGroup$.subscribe(
      value=>this.selectedGroup=value
    )


  }

  public sendTo() {
    this.wss.sendOne(this.selectedUser.username||'',this.message);
    let chatContentWithThisUsermodel= this.dataService.chatContentExample.filter(
      element =>element.usernameTo==this.selectedUser.username
    );
    if (chatContentWithThisUsermodel.length==0) {
      this.dataService.chatContentExample.push({

        "usernameTo":this.selectedUser.username,
        "messages":[{message: this.message, userName: 'me', mine: true}]
      });
      this.userService.loadSelectedChatContent(this.selectedUser);
    }else{
      if (this.message!='') {
        chatContentWithThisUsermodel[0].messages?.push({message: this.message, userName: 'me', mine: true});
      }
    }
    this.dataService.chatContent$.next(
      this.dataService.chatContentExample
    );
    this.message='';
  }
  public sendToGroup() {
    this.chatService.sendToGroup(this.selectedGroup.name||'',this.message);
    let groupChatContentWithNameroom= this.dataService.groupChatContentExample.filter(
      element =>element.name==this.selectedGroup.name
    );
    if (this.message!='') {
      groupChatContentWithNameroom[0].messages?.push({message: this.message, userName: JSON.parse(sessionStorage.USERLOGIN).username, mine: true});
    }
    this.dataService.groupChatContent$.next(
      this.dataService.groupChatContentExample
    );
    this.message='';

  }
}
