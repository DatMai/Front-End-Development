import { Injectable } from '@angular/core';
import { UserModel } from '../model/userModel';
import userData  from '../data/userData.json';
import { WebSocketService } from './web-socket.service';
import { DataService } from './data.service';
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
  
}
