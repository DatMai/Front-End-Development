import { Injectable } from '@angular/core';
import { UserModel } from '../model/userModel';
import userData  from '../data/userData.json';
import { WebSocketService } from './web-socket.service';
import { DataService } from './data.service';
import { ChatContent } from '../model/ChatContent';
import { ChatService } from './chat.service';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  checkUserList:boolean[]=[];
  userList:UserModel[] =userData;
  isLogin:boolean=false;

  constructor(private dataService:DataService) {
  }
  public search(name: string): UserModel[] {
    let users: UserModel[] = [];
    users = this.userList.filter((res) => {
      return res.fullname?.toLocaleLowerCase().match(name.toLocaleLowerCase());
    });
    if (users.length == 0) {
      this.dataService.setCheckSearch(true);
    } else {
      this.dataService.setCheckSearch(false);
    }
    return users;
  }


   public findByUserName(userName:string):UserModel{
    let u: UserModel= this.userList.find(user =>
      user.username==userName
    )||{};
    return u;
    }
    public findByUsernameAndPass(username:string,pass:string):UserModel{
      let u: UserModel= this.userList.find(user =>
        user.username==username&&user.password==pass
      )||{};
      return u;
    }
    public getListFriends(user:UserModel):UserModel[]{
      let rs : UserModel[]=[];
      user.friends?.forEach( f => {
      let u =this.findByUserName(f);
        rs.push(u);
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

}
