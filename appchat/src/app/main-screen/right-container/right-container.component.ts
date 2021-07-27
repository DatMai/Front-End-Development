import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-right-container',
  templateUrl: './right-container.component.html',
  styleUrls: ['./right-container.component.scss']
})
export class RightContainerComponent implements OnInit {

  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
  }

  public isSelectedChatBox(){
    return this.chatService.isChatBoxSelected();
  }
}
