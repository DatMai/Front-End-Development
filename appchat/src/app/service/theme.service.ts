import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import listTheme from '../data/theme.json';
import { MessagesModel } from '../model/messageModel';
import { ThemeModel } from '../model/ThemeModel';
import { ChatService } from './chat.service';
import { DataService } from './data.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  listTheme: ThemeModel[] = listTheme;

  constructor(
    private dataService: DataService,
    private chatService: ChatService
  ) {}
  ngOnInit(): void {}
  public setTheme(theme: ThemeModel) {
    this.dataService.selectedChatContent.theme = theme;
  }
  public clear() {
    this.dataService.selectedChatContent.theme = undefined;
  }
  public saveTheme() {
    let theme = this.dataService.selectedChatContent.theme;

    let mes = 'appchat-b16ea-admin-notification-theme : ' + theme?.name;
    this.chatService.sendTo(mes);
  }
  public findByName(name: string) {
    let rs = listTheme.find((value: ThemeModel) => value.name == name);
    return rs;
  }
}
