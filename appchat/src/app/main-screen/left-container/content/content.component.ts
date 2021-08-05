import { Component, OnInit } from '@angular/core';
import { ChatContent } from 'src/app/model/ChatContent';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  USERLOGIN: UserModel = {};
  checkSearch: boolean = false;
  name: string = '';
  constructor(
    private dataService: DataService,
    private userService: UserService,
    private wss: WebSocketService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.dataService.seach$.subscribe((text) => (this.name = text));

    this.dataService.checkSearch$.subscribe(
      (check) => (this.checkSearch = check)
    );
    this.USERLOGIN = JSON.parse(sessionStorage.USERLOGIN);
  }
  public logout() {
    this.wss.logout();
    // console.log(this.dataService.reLoginCode);
    // this.wss.relogin();

    // this.wss.getReLoginMessage("doan",this.dataService.reLoginCode);
    // this.wss.sendMessage1();
    // this.wss.receiveMessage();
  }
  public getListSearch() {
    return this.userService.search(this.name);
  }
  public isShowSearch() {
    return this.dataService.isShowSearch;
  }
  public checkUser(user: UserModel) {
    return this.wss.checkUser(user);
  }
  public isShowListChatBox() {
    return this.dataService.isShowListChatBox;
  }
  public isShowListFriend() {
    return this.dataService.isShowListFriend;
  }
  public isShowSetting() {
    return this.dataService.isShowSetting;
  }
  public getListUser() {
    return this.dataService.getListUser();
  }
  public getUSERLOGIN() {
    return this.dataService.USERLOGIN;
  }
  public getChatContentExample() {
    return this.dataService.getChatContentExample();
  }

  public setSelectedChatContent(chatContent: ChatContent) {
    // this.userService.getAudio();
    this.chatService.setSelectedChatContent(chatContent);
  }
  public setSelectedChatContentByUserModel(usermodel: UserModel) {
    this.checkUser(usermodel);
    this.chatService.setSelectedChatContentByUserModel(usermodel);
  }

  public goToBottom() {
    let bottomPoint = document.getElementById('chatContent') || document.body;
    bottomPoint.scrollTo(0, bottomPoint.scrollHeight);
  }
  public getNewMessage(chatContent: ChatContent): string {
    return this.chatService.getNewMessage(chatContent);
  }
}
