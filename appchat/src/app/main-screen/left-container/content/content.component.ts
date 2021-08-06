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
    this.dataService.search$.subscribe((text) => (this.name = text));
    this.USERLOGIN = JSON.parse(sessionStorage.USERLOGIN);
  }
  public logout() {
    this.wss.logout();
  }
  public getListSearch() {
    return this.userService.search(this.name);
  }
  public isCheckSearch() {
    return this.name.length != 0;
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
    console.log(this.getLastTime(chatContent));

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

  public getStringLastMessage(chatContent: ChatContent): string {
    let messages = this.chatService.getLastMessage(chatContent);
    let rs = messages;
    if (rs != 'Chưa có tin nhắn mới') {
      if (messages.mine) {
        rs = 'Bạn: ' + messages.message;
      } else {
        if (chatContent.isGroup) {
          rs = messages.userName + ':' + messages.message;
        } else {
          rs = messages.message;
        }
      }
    }
    return rs;
  }

  // public getLastTime(chatContent: ChatContent) {
  //   let messages = this.chatService.getLastMessage(chatContent);
  //   let today = new Date();
  //   let thatday = new Date(messages.createAt);
  //   var dayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //   //xét trường hợp năm nhuận
  //   if (today.getFullYear() % 400 == 0) {
  //     dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //   } else {
  //     if (today.getFullYear() % 4 == 0) {
  //       dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //     }
  //   }
  //   let rs: string;
  //   //chuyển ngày tháng năm giờ phút sang giây
  //   let distanceYear = today.getFullYear() - thatday.getFullYear();
  //   if (distanceYear <= 1) {
  //     let distanceMonth = distanceYear * 12 + today.getMonth() - thatday.getMonth();
  //     let sub =0;
  //     if (distanceMonth>12) {
  //       rs= 1 + ' năm';
  //     } else {
  //       for (let i = thatday.getMonth(); i < thatday.getMonth()+distanceMonth; i++) {
  //         sub += dayOfMonth[i%12] * 24 * 60 * 60;
  //       }
  //       sub = sub - thatday.getDate()*24*60*60-thatday.getHours()*60*60-thatday.getMinutes()*60;
  //       sub = sub + today.getDate()*24*60*60+today.getHours()*60*60+today.getMinutes()*60;
  //       let minutes = Math.round(sub / 60) > 0 ? Math.round(sub / 60) : 1;
  //       let hours = (minutes - (minutes % 60)) / 60;
  //       let days = (hours - (hours % 24)) / 24;
  //       let month =
  //         (days - (days % dayOfMonth[thatday.getMonth()])) /
  //         dayOfMonth[thatday.getMonth()];
  //       if (month > 0) {
  //         rs = month + ' tháng';
  //       } else if (days > 0) {
  //         rs = days + ' ngày';
  //       } else if (hours > 0) {
  //         rs = hours + ' giờ';
  //       } else {
  //         rs = minutes + ' phút';
  //       }
  //     }

  //   } else rs = distanceYear + ' năm';

  //   return rs;
  // }
  public getLastTime(chatContent: ChatContent) {
    let messages = this.chatService.getLastMessage(chatContent);
    // let mes = this.roomName.split(' ');
    let today = new Date();
    let thatday = new Date(messages.createAt);
    var dayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //xét trường hợp năm nhuận
    if (today.getFullYear() % 400 == 0) {
      dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
      if (today.getFullYear() % 4 == 0) {
        dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      }
    }
    let rs: string = '';
    //chuyển ngày tháng năm giờ phút sang giây
    let distanceYear = today.getFullYear() - thatday.getFullYear();
    if (distanceYear <= 1) {
      let distanceMonth =
        distanceYear * 12 + today.getMonth() - thatday.getMonth();
      let distanceDate = today.getDate() - thatday.getDate();
      if (distanceMonth > 12) {
        rs = '1 năm';
      } else if (distanceMonth == 12) {
        if (distanceDate >= 0) {
          rs = '1 năm';
        } else {
          rs = '11 tháng';
        }
      } else {
        if (distanceMonth > 1) {
          if (distanceDate >= 0) {
            rs = distanceMonth + ' tháng';
          } else {
            rs = distanceMonth - 1 + ' tháng';
          }
        } else if (distanceMonth == 1) {
          if (distanceDate >= 0) {
            rs = '1 tháng';
          } else {
            rs = dayOfMonth[thatday.getMonth()] + distanceDate + 'ngày';
          }
        } else {
          let second =
            today.getDate() * 24 * 60 * 60 +
            today.getHours() * 60 * 60 +
            today.getMinutes() * 60 -
            (thatday.getDate() * 24 * 60 * 60 +
            thatday.getHours() * 60 * 60 +
            thatday.getMinutes() * 60);
            let minutes = second/60>0?(second-second%60)/60:1;
            let hours =(minutes-minutes%60)/60;
            let days = (hours-hours%24)/24;
            if(days>0) return rs = days + ' ngày';
            if(hours>0) return rs = hours + ' giờ';
            if(minutes>0) return rs = minutes + ' phút';
          }
      }
    } else rs = distanceYear + ' năm';
    return rs;
  }
}
