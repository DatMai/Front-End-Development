import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { ChatContent } from '../model/ChatContent';
import { GroupChat } from '../model/GroupChat';
import { UserModel } from '../model/userModel';
import groupChatData  from '../data/groupChat.json';
import { ChatService } from './chat.service';
import { EmojisModel } from '../model/emojisModel';
export  interface iDataService{
  getSelectedGroup():GroupChat;
  getSelectedUser():UserModel;
}
@Injectable({
  providedIn: 'root'
})

export class DataService implements OnInit  {
  reLoginCode:string="";
  USERLOGIN :UserModel={};
  UserloginTest:UserModel={};
  userIsCheckingList :UserModel[]=[];
  userIsChecking :UserModel={};
  selectedEmoji$ = new BehaviorSubject<EmojisModel>({});
  checkUserList$=new BehaviorSubject<boolean>(false);
  selectedChatContent$=new BehaviorSubject<ChatContent>({});
  chatContent$=new BehaviorSubject<ChatContent[]>([]);
  message$= new BehaviorSubject<string>("");
  alert$= new BehaviorSubject<string>("");
  chatContentExample: ChatContent[]=[];
  selectedChatContent: ChatContent= {};
  checkLogin: boolean=false;
  isShowListFriend:boolean=false;
  isShowListChatBox:boolean=true;
  isShowSetting:boolean=false;
  chatContentUserName:string='';
  constructor() {

  }

  ngOnInit(): void {

  }
  public resetData(){
    this.isShowListFriend=false;
    this.isShowListChatBox=true;
    this.isShowSetting=false;
    this.USERLOGIN={};
    this.selectedChatContent={};
    this.chatContentExample=[];
    sessionStorage.removeItem('USERLOGIN');
    sessionStorage.removeItem('RELOGINCODE');
  }
  public getChatContentExample() {

    return this.chatContentExample;
  }

  public getSelectedChatContent() {
    return this.selectedChatContent;
  }
  public getListFriends() {
    return this.USERLOGIN.friends;
  }
  public getUSERLOGIN() {
    return this.USERLOGIN;
  }


}

