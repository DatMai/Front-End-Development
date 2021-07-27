import { Injectable } from '@angular/core';
import { UserModel } from '../model/userModel';
import userData  from '../data/userData.json';
import { WebSocketService } from './web-socket.service';
import { DataService } from './data.service';
import { ChatContent } from '../model/ChatContent';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ChatService } from './chat.service';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  userList:UserModel[] =userData;
  isLogin:boolean=false;
  message = new BehaviorSubject<string>("");
  alert = new BehaviorSubject<string>("");
  constructor(private wss:WebSocketService,private dataService:DataService,private chatService:ChatService,private router:Router) {

   }
   public addUser(user:UserModel) {
      if (localStorage.getItem('USERS')) {
        this.userList = JSON.parse(localStorage.getItem('USERS')||'{}');
        this.userList=[user, ...this.userList];
      }else{
        this.userList=[user];
      }
      localStorage.setItem('USERS',JSON.stringify(this.userList));

   }

   public findByUserName(userName:string):UserModel{
      let u : UserModel=  {};
      this.userList.forEach(user => {
          if (user.username==userName) {
              u=user;
          }
      });
      return u;
    }
    public async login(username:string,password:string){
      this.wss.checkLogin(username, password);
      await this.wss.receiveMessage();
      console.log(this.wss.dataFromServer);
      // if (data.event!=undefined){
      if(this.wss.dataFromServer.status=="success"){
        this.dataService.USERLOGIN=this.findByUserName(username);
        sessionStorage.setItem('USERLOGIN',JSON.stringify(this.dataService.USERLOGIN));
        this.loadListChatBox(this.dataService.USERLOGIN);
        this.router.navigateByUrl('home');
      }else{
        this.alert.next("warning");
        this.message.next("Bạn nhập sai tên đăng nhập hoặc mật khẩu");
      }
    }

    public getListFriends(user:UserModel):UserModel[]{
      let rs : UserModel[]=[];
      user.friends?.forEach(f => {
        rs.push(this.findByUserName(f));
      });
      return rs;
    }
    public getListChatBox(user:UserModel):ChatContent[]{
      let rs : ChatContent[]=[];
      user.chatContents?.forEach(f =>{
        rs.push(f);
      }
      );
      return rs;
    }
    public getGroupChat(user:UserModel):UserModel[]{
      let rs : UserModel[]=[];
      user.friends?.forEach(f => {
        rs.push(this.findByUserName(f));
      });
      return rs;
    }
    public loadUserData(user:UserModel){
    }
    public loadListChatBox(user:UserModel){
      user.chatContents?.forEach(element => {
        if (element.isGroup) this.chatService.joinRoomChat(element.name||"");
        else
        this.dataService.chatContentExample.push(element);
      });
      this.dataService.chatContent$.next(this.dataService.chatContentExample);
    }
}
