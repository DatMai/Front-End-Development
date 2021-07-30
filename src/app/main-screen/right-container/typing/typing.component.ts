import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/userModel';
import { DataService } from 'src/app/service/data.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.css']
})
export class TypingComponent implements OnInit {

  message:string='';
  @Input() selectedUser:UserModel ={};

  constructor(private wss:WebSocketService,private dataService:DataService) { }

  ngOnInit(): void {

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
    }else{
      if (this.message!='') {
        chatContentWithThisUsermodel[0].messages?.push({message: this.message, userName: 'me', mine: true});

      }
    }
    this.dataService.chatContent$.next(
      this.dataService.chatContentExample
    );
    this.message='';
    console.log(this.dataService.chatContentExample);

  }
}
