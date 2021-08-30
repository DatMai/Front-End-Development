import { Injectable } from '@angular/core';
import { UserModel } from '../model/userModel';
import userData  from '../data/userData.json';
@Injectable({
  providedIn: 'root'
})
export class SearchUserService {
  checkUserList:boolean[]=[];
  userList:UserModel[] =userData;
  constructor() { }
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
}
