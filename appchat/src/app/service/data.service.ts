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
  USERLOGIN: UserModel = {};
  selectedEmoji$ = new BehaviorSubject<EmojisModel>({});
  checkLogin$=new BehaviorSubject<boolean>(false);
  selectedChatContent$=new BehaviorSubject<ChatContent>({});
  chatContent$=new BehaviorSubject<ChatContent[]>([]);
  chatContentExample: ChatContent[]=[];
  selectedChatContent: ChatContent= {};
  checkLogin: boolean=false;
  isShowListFriend:boolean=false;
  isShowListChatBox:boolean=true;
  isShowSetting:boolean=false;
  constructor() {

  }

  ngOnInit(): void {

  }
  public getChatContentExample() {
    return this.chatContentExample;
  }

  public getSelectedChatContent() {
    return this.selectedChatContent;
  }

  // public loadSelectedChatContent(chatContent:ChatContent){
  //   let rs = this.chatContentExample.filter(
  //       element =>element.userList==user.username);
  //    if (rs.length==0) {
  //      this.selectedChatContent$.next({
  //        "userList":user.username,
  //        "messages":[]
  //      });
  //    }else
  //    this.selectedChatContent$.next(
  //        rs[0]
  //    );
  // }

}
