import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { SearchMessageService } from 'src/app/service/search-message.service';

@Component({
  selector: 'app-search-word-modal',
  templateUrl: './search-word-modal.component.html',
  styleUrls: ['./search-word-modal.component.css']
})
export class SearchWordModalComponent implements OnInit {
  keyWord: string = '';

  constructor(private dataService: DataService,private searchMessageService:SearchMessageService) { }

  ngOnInit(): void {
    this.dataService.searchMessage$.subscribe((text) => (this.keyWord = text));
  }
  public close() {
    this.dataService.isShowSearchMessage = false;
    this.dataService.selectedChatContent.messages?.forEach((f) => {
      f.highlight = false;
    });
    this.searchMessageService.searchIndex = 0;
  }
  public getResultSearchMessageCount(): any {
    let count = 0;
    count = this.searchMessageService.searchMessage(this.keyWord).length;
    return count;
  }
  public isShowSearchMessage() {
    return this.dataService.isShowSearchMessage;
  }
  public findUp() {
    let temp: any;
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

    if (    this.searchMessageService.searchIndex < this.dataService.searchKeyWord.length) {
      document
        .getElementById(this.dataService.searchKeyWord[this.searchMessageService.searchIndex++])
        ?.scrollIntoView();
    }
    console.log(this.searchMessageService.searchIndex);
  }
  public findDown() {
    let temp: any;
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

    if (this.searchMessageService.searchIndex >= 0  ) {
    document
      .getElementById(this.dataService.searchKeyWord[this.searchMessageService.searchIndex--])
      ?.scrollIntoView();
    }
    console.log(this.searchMessageService.searchIndex);
  }
}
