import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import { ResponsiveService } from 'src/app/service/responsive.service';
import { SearchMessageService } from 'src/app/service/search-message.service';

@Component({
  selector: 'app-search-message-modal',
  templateUrl: './search-message-modal.component.html',
  styleUrls: ['./search-message-modal.component.scss']
})
export class SearchMessageModalComponent implements OnInit {
  keyWord: string = '';

  constructor( private dataService: DataService,
    private chatService: ChatService,
    private res: ResponsiveService,
    private searchMessageService: SearchMessageService) { }

  ngOnInit(): void {
  }
  public getKeyWordToSearch() {
    this.dataService.setSearchKeywordMessage(this.keyWord);
    this.searchMessageService.searchMessage(this.keyWord);
    this.dataService.searchKeyWord.splice(
      0,
      this.dataService.searchKeyWord.length
    );
    this.searchMessageService.searchIndex = 0;
    this.dataService.isShowSearchMessage = true;
  }
  public getKeyWord(event: any) {
    this.keyWord = event.target.value;
  }
}
