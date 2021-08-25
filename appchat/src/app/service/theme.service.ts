import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import listTheme from '../data/theme.json';
import { ThemeModel } from '../model/ThemeModel';
import { ChatService } from './chat.service';
import { DataService } from './data.service';
import { GifService } from './gif.service';
import { WebSocketService } from './web-socket.service';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  listTheme: ThemeModel[] = listTheme;
  constructor(
    private wss: WebSocketService,
    private dataService: DataService,
    private chatService: ChatService,
    private router: Router,
    private gif: GifService
  ) {}
  ngOnInit(): void {}
  public setTheme(theme:ThemeModel){
    this.dataService.selectedChatContent.theme=theme;
  }
}
