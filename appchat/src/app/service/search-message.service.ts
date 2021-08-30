import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';
import { DataService } from './data.service';
import { GifService } from './gif.service';

@Injectable({
  providedIn: 'root',
})
export class SearchMessageService {
  constructor(
    private dataService: DataService,
    private gif: GifService,
    private chatSerivce: ChatService
  ) {}
  public searchMessage(keyWord: string): string[] {
    let arraySearch: string[] = [];
    this.dataService.selectedChatContent.messages?.forEach((f) => {
      if (
        !this.gif.isGif(f.message) &&
        !this.chatSerivce.isNofication(f.message)
      )
        arraySearch.push(f.message);
    });
    arraySearch = arraySearch.filter((res) => {
      return res.toLocaleLowerCase().match(keyWord.toLocaleLowerCase());
    });
    this.dataService.selectedChatContent.messages?.forEach((f) => {
      f.highlight = false;
      arraySearch.forEach((s) => {
        if (f.message == s) {
          f.highlight = true;
        }
      });
    });
    return arraySearch;
  }
}
