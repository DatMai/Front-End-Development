import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { __await } from 'tslib';
import { DataService } from './data.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  // @Output() rs  = MessageEvent;
  message:any;
  data$  = new BehaviorSubject<any>({});
  dataFromServer:any;
  messageList:string[] =[];
  ws= new WebSocket('ws://203.113.148.132:23023/chat/chat');
  ws1: WebSocket | undefined;
  constructor(private dataService:DataService) {

  }
  public receiveMessage(){
    this.ws.onmessage=(e=>{
      let data = JSON.parse(e.data);
      // if (data.event!=undefined)
      this.dataFromServer=data;
      console.log(this.dataFromServer);

      // this.data$.next(data);
      if(data.event=="SEND_CHAT"&&data.status=="success"){
        if (data.data.type=="1") {
          let groupChatContentWithNameroom= this.dataService.chatContentExample.filter(
            element =>element.name==data.data.to
          );
          groupChatContentWithNameroom[0].messages?.push({message: data.data.mes, userName: data.data.name, mine: false});
          this.dataService.chatContent$.next(
            this.dataService.chatContentExample
          );
       }else
        {
        let chatContentWithThisUsermodel= this.dataService.chatContentExample.filter(
          element =>element.userList==data.data.name
        );
        if (chatContentWithThisUsermodel.length==0) {
          this.dataService.chatContentExample.push({
            "name":data.data.name,
            "userList":data.data.name,
            "messages":[{message: data.data.mes, userName: data.data.name, mine: false}],
            "isGroup":false
          });
        }else{
         chatContentWithThisUsermodel[0].messages?.push({message: data.data.mes, userName: data.data.name, mine: false});
        }
        this.dataService.chatContent$.next(
          this.dataService.chatContentExample
        );
        }
      }
      if (this.dataFromServer.event=="JOIN_ROOM") {
        let name =this.dataFromServer.data.name;
        let messages1: {"message": string, "userName": string, "mine": boolean}[]=[];
        this.dataFromServer.data.chatData.reverse().forEach((e:any) => {
          let mine =false;
          let USERLOGIN = JSON.parse(sessionStorage.USERLOGIN);
          if (e.name==USERLOGIN.username) {
             mine =true
          }
         messages1.push({"message": e.mes, "userName": e.name, "mine": mine})
       })
       let groupChatContain = this.dataService.chatContentExample.find(element => {
           element.name==name
       })||{};
       if (groupChatContain.name==undefined){
        // this.dataService.chatContentExample.push(
        //  {
        //    "name":name,
        //    "userList":this.dataFromServer.data.userList,
        //    "messages":messages1,
        //    "isGroup":true,
        //  }
        //  )
        this.dataService.chatContentExample=[
                   {
           "name":name,
           "userList":this.dataFromServer.data.userList,
           "messages":messages1,
           "isGroup":true,
         },...this.dataService.chatContentExample]
      }else
         {
           groupChatContain.userList =this.dataFromServer.data.userList;
           groupChatContain.messages =messages1;
         }
      this.dataService.chatContent$.next(
       this.dataService.chatContentExample
      );
    }
     if(data.event=="CREATE_ROOM"&&data.status=="success"){
      this.dataService.chatContentExample.push(
        {
          "name":data.data.name,
          "userList":data.data.userList,
          "messages":[{"message":"Bạn đã tạo nhóm "+data.data.name , "userName": "Hệ thống", "mine": false}],
          "isGroup":true
        }
      );
      this.dataService.chatContent$.next(
        this.dataService.chatContentExample
      );
    }
    });
    return new Promise(resolve=>{
      setTimeout(()=>{
        resolve(this.ws.readyState)
      },100);
    });
  }
  public sendMessage1(){
    this.ws.send(this.message);
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
  public getJoinRoomMessage(nameRoom:string){
    this.message=JSON.stringify(
      {
      action: "onchat",
      data: {
        event: "JOIN_ROOM",
        data: {
          name: nameRoom
        }
      }
    });
  }
  public getCreateRoomMessage(nameRoom:string){
    this.message=JSON.stringify(
      {
        "action": "onchat",
        "data": {
          "event": "CREATE_ROOM",
          "data": {
            "name": nameRoom
          }
        }
      });
  }
  public getRegisterMessage(user:string,pass:string){
    this.message=JSON.stringify(
      {
        "action": "onchat",
        "data": {
          "event": "REGISTER",
          "data": {
            "user": user,
            "pass": pass
          }
        }
      });
  }
  public getLoginMessage(user:string,pass:string) {
    this.message=(JSON.stringify({
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
