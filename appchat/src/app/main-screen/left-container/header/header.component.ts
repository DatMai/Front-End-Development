import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/userModel';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  roomName: string = '';
  USERLOGIN: UserModel = {};

  name!: string;
  check: boolean = false;
  constructor(
    private dataService: DataService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
  public search() {
    this.dataService.setSearchKeyword(this.name);
    this.dataService.isShowSearch = true;
    this.dataService.isShowListFriend = false;
    this.dataService.isShowListChatBox = false;
    this.dataService.isShowSetting = false;
  }

  public showSetting() {
    this.dataService.isShowSetting = true;
    this.dataService.isShowListChatBox = false;
    this.dataService.isShowListFriend = false;
    this.dataService.isShowSearch = false;
  }
  public getUserlogin() {
    return this.dataService.USERLOGIN;
  }
  public showListChatBox() {
    this.dataService.isShowListChatBox = true;
    this.dataService.isShowListFriend = false;
    this.dataService.isShowSetting = false;
    this.dataService.isShowSearch = false;
  }
  public showListFriend() {
    this.dataService.isShowListFriend = true;
    this.dataService.isShowListChatBox = false;
    this.dataService.isShowSetting = false;
    this.dataService.isShowSearch = false;
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
}
