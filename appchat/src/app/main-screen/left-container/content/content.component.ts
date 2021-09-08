import { Component, OnInit } from '@angular/core';
import { ChatContent } from 'src/app/model/ChatContent';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import { GifService } from 'src/app/service/gif.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketService } from 'src/app/service/web-socket.service';
import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";

import {ResponsiveService} from "../../../service/responsive.service";

import { ImageService } from 'src/app/service/image.service';
import { SearchUserService } from 'src/app/service/search-user.service';
import { SearchMessageService } from 'src/app/service/search-message.service';
import { MessageService } from 'src/app/service/message.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [
    trigger("listAnimation",[
      transition('* => *',[
        query(':enter', style({opacity:0}),{optional:true}),
        query(':enter', stagger('50ms',[
          animate('0.3s', keyframes([
            style({opacity:0, transform: "translateX(-75px)",offset: 0}),
            style({opacity:1, transform: "translateX(0px)",offset: 1}),
          ]))
        ]),{optional:true})
      ])
    ])
  ],
})
export class ContentComponent implements OnInit {
  USERLOGIN: UserModel = {};
  checkSearch: boolean = false;
  name: string = '';
  constructor(
    private dataService: DataService,
    private userService: UserService,
    private wss: WebSocketService,
    private chatService: ChatService,
    private gifService: GifService,
    private searchUserService: SearchUserService,
    private searchMessageService: SearchMessageService,
    private res: ResponsiveService,
    private messageService: MessageService,
    private imageService: ImageService

  ) {}

  ngOnInit(): void {
    this.USERLOGIN = JSON.parse(sessionStorage.USERLOGIN);
  }
  public darkMode() {
    this.dataService.isDarkMode = !this.dataService.isDarkMode;
  }
  public getDarkMode() {
    return this.dataService.isDarkMode;
  }
  public selected(index :number){
    let listActive : any = document.getElementsByClassName("chat-active");
    for(let i = 0; i < listActive.length; i++){
      listActive.item(i).classList.remove("chat-active");
    }
    let className:string = "user-"+index;
    let listElements : any = document.getElementsByClassName(className);
    for(let i = 0; i < listElements.length; i++){
      listElements.item(i).classList.add("chat-active");
    }
  }

  public logout() {
    this.wss.logout();
  }
  public getListSearch() {
    this.res.isClickShowLeftContainer = false;
    this.name=this.searchUserService.keySearch;
    return this.searchUserService.searchChatContent(this.searchUserService.keySearch);
  }
  public isCheckSearch() {
    return this.name.length != 0;
  }
  public isShowSearch() {
    return this.dataService.isShowSearch;
  }
  public isShowFunction() {
    return this.dataService.isShowFunction;
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



  public setSelectedChatContent(chatContent: ChatContent, index:number) {

    this.res.isClickShowLeftContainer = false;

    // this.userService.getAudio();
    this.dataService.isShowSearchMessage = false;
    this.dataService.selectedChatContent.messages?.forEach(f => {
      f.highlight = false;
    })
    this.searchMessageService.searchIndex = 0;
    console.log(this.getLastTime(chatContent));

    this.chatService.setSelectedChatContent(chatContent);
    this.selected(index);
  }
  public setSelectedChatContentByUserModel(usermodel: UserModel, index:number) {
    this.selected(index);
    this.res.isClickShowLeftContainer = false;
    this.checkUser(usermodel);
    this.dataService.isShowSearchMessage = false;
    this.dataService.selectedChatContent.messages?.forEach(f => {
      f.highlight = false;
    })
    this.chatService.setSelectedChatContentByUserModel(usermodel);

  }

  public goToBottom() {
    let bottomPoint = document.getElementById('chatContent') || document.body;
    bottomPoint.scrollTo(0, bottomPoint.scrollHeight);
  }

  public getStringLastMessage(chatContent: ChatContent): string {
    let messages = this.chatService.getLastMessage(chatContent);
    let rs = messages.message;
    if (messages.description=="NOTIFICATION") {
      return rs;
    }
    if (rs != 'Chưa có tin nhắn mới') {
      if (this.imageService.isImage(messages.message)) {
        if (messages.mine) {
          rs= 'Bạn đã gửi 1 ảnh';
        } else {
          rs = messages.userName + ' đã gửi 1 ảnh';
        }
      }else if (this.gifService.isGif(messages.message)) {
        if (messages.mine) {
          rs= 'Bạn đã gửi 1 gif';
        } else {
          rs = messages.userName + ' đã gửi 1 gif';
        }
      }else{
          if (messages.mine) {
            rs = 'Bạn: ' + messages.message;
          } else {
            if (chatContent.isGroup) {
              rs = messages.userName + ': ' + messages.message;
            } else {
              rs = messages.message;
            }
          }

        }
      }
      if(rs!=undefined&&rs.length>25) rs=rs.substring(0,25)+"...";
    return rs;
  }
  public getLastTime(chatContent){
    let messages = this.chatService.getLastMessage(chatContent);
    let thistime = new Date().toLocaleString();
    return this.messageService.getLastTime(messages.createAt,thistime);
  }
}
