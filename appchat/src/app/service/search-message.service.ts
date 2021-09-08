import { templateJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ThemeModel } from '../model/ThemeModel';
import { ChatService } from './chat.service';
import { DataService } from './data.service';
import { GifService } from './gif.service';

@Injectable({
  providedIn: 'root',
})
export class SearchMessageService {
  searchIndex: number = 0;
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
        !this.chatSerivce.isNofication(f.message)&&
        f.description!="NOTIFICATION"
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
  public sortById() {  let temp: any;
    for (let i = 0; i < this.dataService.searchKeyWord.length; i++) {
      for (let j = i; j < this.dataService.searchKeyWord.length; j++) {
        if (
          parseInt( this.dataService.searchKeyWord[i].substring(
            4,
            this.dataService.searchKeyWord[i].length
          ))
          <
          parseInt( this.dataService.searchKeyWord[j].substring(
            4,
            this.dataService.searchKeyWord[j].length
          )
        ))
          {
          temp = this.dataService.searchKeyWord[i];
          this.dataService.searchKeyWord[i] = this.dataService.searchKeyWord[j];
          this.dataService.searchKeyWord[j] = temp;
        }
      }
    }
}
}
