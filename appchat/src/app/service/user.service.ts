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

  constructor(private dataService:DataService,private chatService:ChatService,private wss:WebSocketService) {
  }
  public login(username:string,password:string){
    this.wss.getLoginMessage(username, password);
    this.dataService.USERLOGIN=this.findByUsernameAndPass(username, password);
    this.wss.sendMessage1();
    setTimeout(()=>this.loadUserLoginData(),1000);
  }
  public register(username:string,password:string){
    this.wss.getRegisterMessage(username, password);
    this.wss.sendMessage1();
  }
  public logout(){
    this.wss.getLogoutMessage();
    this.wss.sendMessage1();
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
    public loadUserLoginData(){
      // this.dataService.USERLOGIN=JSON.parse(sessionStorage.USERLOGIN);
      let user = this.dataService.USERLOGIN;
      user.status="Đang hoạt động";
      this.loadListFriend(user);
      this.loadListChatBox(user);
    }
    public loadListChatBox(user:UserModel){
      let rs= this.getListChatBox(user);
      rs.forEach(element => {
        if (element.isGroup) this.chatService.getRoomChatMes(element.name||"",element.totalPage||1);
        else this.chatService.getPeopleChatMessage(element.userList||"",element.totalPage||1);
        this.dataService.chatContentExample.push(element);
      });
      // sessionStorage.setItem("CHATBOX",JSON.stringify(rs));
      this.dataService.USERLOGIN.chatContents=rs;
      this.dataService.chatContent$.next(this.dataService.chatContentExample);
    }
    public loadListFriend(user:UserModel){
      let rs=this.getListFriends(user);
      let i=0;
      setInterval(()=>{
          if (i<this.getListFriends(user).length&&this.dataService.USERLOGIN.username!=undefined) {
            this.chatService.checkUser(rs[i]);
            i++;
            if (i==this.getListFriends(user).length) i=0;
          }
        },1000);
      // sessionStorage.setItem("FRIENDS",JSON.stringify(rs));
      this.dataService.USERLOGIN.friends=rs;
    }
}
