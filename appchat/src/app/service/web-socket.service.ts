import { EventEmitter, Injectable, Output } from '@angular/core';

import { __await } from 'tslib';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  // @Output() rs  = MessageEvent;
  dataFromServer:any;
  messageList:string[] =[];
  ws= new WebSocket('ws://203.113.148.132:23023/chat/chat');
  constructor(private dataService:DataService) {

  }

  public receiveMessage(){
    this.ws.onmessage=(e=>{
      let data = JSON.parse(e.data);
      this.dataFromServer=data;
      if(data.event=="SEND_CHAT"&&data.status=="success"){
        if (data.data.type=="1") {
          let groupChatContentWithNameroom= this.dataService.groupChatContentExample.filter(
            element =>element.name==data.data.to
          );
          groupChatContentWithNameroom[0].messages?.push({message: data.data.mes, userName: data.data.name, mine: false});
          this.dataService.groupChatContent$.next(
            this.dataService.groupChatContentExample
          );
       }else
        {
        let chatContentWithThisUsermodel= this.dataService.chatContentExample.filter(
          element =>element.usernameTo==data.data.name
        );
        if (chatContentWithThisUsermodel.length==0) {
          this.dataService.chatContentExample.push({
            "usernameTo":data.data.name,
            "messages":[{message: data.data.mes, userName: data.data.name, mine: false}]
          });
        }else{
         chatContentWithThisUsermodel[0].messages?.push({message: data.data.mes, userName: data.data.name, mine: false});
        }
        this.dataService.chatContent$.next(
          this.dataService.chatContentExample
        );
        // console.log( this.dataService.chatContent$);
        }
      }

    });
    return new Promise(resolve=>{
      setTimeout(()=>{
        resolve(this.ws.readyState)
      },100);
    });
  }



  public sendOne(nameto:string,message:string){
      this.ws.send(JSON.stringify({
          action: "onchat",
          data: {
            event: "SEND_CHAT",
            data: {
              type: "people",
              to: nameto,
              mes: message
            }
          }
    }));
  }
  public sendMessage(message:string){
    this.ws.send(message);
  }


  public checkLogin(user:string,pass:string): void {
    this.ws.send(JSON.stringify({
      action: "onchat",
      data: {
        event: "LOGIN",
        data: {
          user: user,
          pass: pass
        }
      }
  }));
  }

}
