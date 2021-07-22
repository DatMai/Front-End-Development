import { Injectable } from '@angular/core';
import { UserModel } from '../model/userModel';
import userData  from '../data/userData.json';
import { WebSocketService } from './web-socket.service';
import { DataService } from './data.service';
import { ChatContent } from '../model/ChatContent';
import { GroupChat } from '../model/GroupChat';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  userList:UserModel[] =userData;
  isLogin:boolean=false;
  constructor(private wss:WebSocketService,private dataService:DataService) {

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

      if(this.wss.dataFromServer.status=="success"){
        this.isLogin= true;
      }
    }
    public getListFriends(user:UserModel):UserModel[]{
      let rs : UserModel[]=[];
      user.friends?.forEach(f => {
        rs.push(this.findByUserName(f));
      });
      return rs;
    }
    public getListChatBox(user:UserModel):UserModel[]{
      let rs : UserModel[]=[];
      user.chatContents?.forEach(f => {
        // rs.push(this.findByUserName(f.usernameTo||""));
        if(this.findByUserName(f.usernameTo||"").username==undefined){
          rs.push( {
          fullname :f.usernameTo,
          username:f.usernameTo,
          password:'',
          email:'',
          friends:[],
          chatContents:[]
        })
        }else
        rs.push(this.findByUserName(f.usernameTo||""));

      });
      return rs;
    }
    public getGroupChat(user:UserModel):UserModel[]{
      let rs : UserModel[]=[];
      user.friends?.forEach(f => {
        rs.push(this.findByUserName(f));
      });
      return rs;
    }
    public loadSelectedChatContent(user:UserModel){
    let rs = this.dataService.chatContentExample.filter(
        element =>element.usernameTo==user.username);
     if (rs.length==0) {
       this.dataService.selectedChatContent$.next({
         "usernameTo":user.username,
         "messages":[]
       });
     }else
     this.dataService.selectedChatContent$.next(
         rs[0]
     );
    }
    public loadSelectedGroup(group:GroupChat){
      let rs = this.dataService.groupChatContentExample.filter(
          element =>element.name==group.name);
      this.dataService.selectedGroup$.next(
           rs[0]
      );
    }
}
