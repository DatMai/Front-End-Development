import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
              private wss:WebSocketService,
              private dataService:DataService,

  ) { }

  public createRoomChat(roomName:string) {
    this.wss.sendMessage(JSON.stringify({
      action: "onchat",
      data: {
        event: "CREATE_ROOM",
        data: {
          name: roomName
        }
      }
    }));
  }
  public  async joinRoomChat(roomName:string) {
      this.wss.sendMessage(JSON.stringify({
        action: "onchat",
        data: {
          event: "JOIN_ROOM",
          data: {
            name: roomName
          }
        }
      }));
      await this.wss.receiveMessage();
      console.log(this.wss.dataFromServer);

     if (this.wss.dataFromServer.event=="JOIN_ROOM") {
       let name =this.wss.dataFromServer.data.name;
       let messages1: {"message": string, "userName": string, "mine": boolean}[]=[];
       this.wss.dataFromServer.data.chatData.reverse().forEach((e:any) => {
         let mine =false;
         let USERLOGIN = JSON.parse(sessionStorage.USERLOGIN);
         if (e.name==USERLOGIN.username) {
            mine =true

         }
        messages1.push({"message": e.mes, "userName": e.name, "mine": mine})
      })
      let groupChatContain = this.dataService.groupChatContentExample.find(element => {
          element.name==name
      })||{};
      if (groupChatContain.name==undefined){
       this.dataService.groupChatContentExample.push(
        {
          "name":name,
          "userList":this.wss.dataFromServer.data.userList,
          "messages":messages1,
          "isGroup":true
        }
        )
     }else
        {
          groupChatContain.userList =this.wss.dataFromServer.data.userList;
          groupChatContain.messages =messages1;
        }
     this.dataService.groupChatContent$.next(
      this.dataService.groupChatContentExample
     );
    }
  }
  public sendToGroup(nameRoom:string,message:string) {
    this.wss.sendMessage(JSON.stringify({
      "action": "onchat",
      "data": {
        "event": "SEND_CHAT",
        "data": {
          "type": "room",
          "to": nameRoom,
          "mes": message
        }
      }
    }));

  }
}
