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
  private colorSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  color$: Observable<string> = this.colorSubject.asObservable();
  private backgroundSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  background$: Observable<string> = this.backgroundSubject.asObservable();
  isTheme: boolean = false;

<<<<<<< HEAD
  constructor() { }
  public setTheme(theme:ThemeModel){
    this.colorSubject.next(theme.data?.color||"");
    this.backgroundSubject.next(theme.data?.color||"");
    this.isTheme=true;
  }

=======
  constructor(
    private wss: WebSocketService,
    private dataService: DataService,
    private chatService: ChatService,
    private router: Router,
    private gif: GifService
  ) {}
  ngOnInit(): void {}
  setColor(text: string) {
    this.colorSubject.next(text);
  }
  setBackground(text: string) {
    this.backgroundSubject.next(text);
  }

  public setTheme(backgroundText: any) {
    let user: any;
    user = this.dataService.selectedChatContent.name;

    this.dataService.chatContentExample.forEach(f => {
      f.messages?.forEach(s => {
        this.dataService.selectedChatContent.messages?.forEach((x) => {
          if (f.name == user && s.message == x.message) {
            s.theme = backgroundText;
          }
        });
      })
    })

  }
>>>>>>> main
}
