import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-right-container',
  templateUrl: './right-container.component.html',
  styleUrls: ['./right-container.component.scss']
})
export class RightContainerComponent implements OnInit {

  constructor(private chatService:ChatService, private dataService:DataService){ }

  ngOnInit(): void {
  }

  public isSelectedChatBox(){
    return this.chatService.isChatBoxSelected();
  }
  public isShowManager(){
    return this.dataService.isShowManager;
  }

}
