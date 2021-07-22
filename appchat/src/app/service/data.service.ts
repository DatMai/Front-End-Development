import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { ChatContent } from '../model/ChatContent';
import { GroupChat } from '../model/GroupChat';
import { UserModel } from '../model/userModel';
import groupChatData  from '../data/groupChat.json';

@Injectable({
  providedIn: 'root'
})
export class DataService  {
  USERLOGIN :UserModel={};
  selectedChatContent$=new BehaviorSubject<ChatContent>({});
  selectedUser$= new BehaviorSubject<UserModel>({});
  selectedGroup$= new BehaviorSubject<GroupChat>({});
  chatContent$=new BehaviorSubject<ChatContent[]>([]);
  groupChatContent$=new BehaviorSubject<GroupChat[]>([]);
  messages : {message: string, userName: string, mine: boolean}[] = [];
  chatContentExample: ChatContent[]=[];
  groupChatContentExample: GroupChat[]= [];
  constructor() {

  }

}
