import { Injectable } from '@angular/core';
import { UserModel } from '../model/userModel';
import userData  from '../data/userData.json';
import { DataService } from './data.service';
import { ChatContent } from '../model/ChatContent';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchUserService {
  keySearch:string="";
  checkUserList:boolean[]=[];
  userList:UserModel[] =userData;
  constructor(private dataService: DataService) { }
  public nonAccentVietnamese(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

  public search(name: string): UserModel[] {
    if (name.length!=0) {
      let users: UserModel[] = [];
      users = this.userList.filter((res) => {
        return this.nonAccentVietnamese(res.fullname?.toLocaleLowerCase()).match(name.toLocaleLowerCase());
      });
      return users;
    }
    // console.log('d'.match('doan'));

    return [];
  }
  public searchChatContent(name: string): ChatContent[] {
    if (name.length!=0) {
      let rs: ChatContent[] = [];
      rs = this.dataService.getChatContentExample().filter((res) => {
        return this.nonAccentVietnamese(res.name?.toLocaleLowerCase()).match(name.toLocaleLowerCase());
      });
      return rs;
    }
    // console.log('d'.match('doan'));
    return [];
  }
}
