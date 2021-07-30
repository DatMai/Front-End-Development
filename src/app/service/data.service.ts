import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { ChatContent } from '../model/ChatContent';
import { UserModel } from '../model/userModel';

@Injectable({
  providedIn: 'root'
})
export class DataService  {
  USERLOGIN :UserModel={};
  selectedChatContent$=new BehaviorSubject<ChatContent>({});
  selectedUser$= new BehaviorSubject<UserModel>({});
  chatContent$=new BehaviorSubject<ChatContent[]>([]);
  messages : {message: string, userName: string, mine: boolean}[] = [];
  chatContentExample: ChatContent[]=[];
  constructor() {
    // this.USERLOGIN=JSON.parse(sessionStorage.USERLOGIN);
  }

  public getUserLogin():UserModel {
    return this.USERLOGIN;
  }
  public reveiceMessage():void {

  }

 
}
