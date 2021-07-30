import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-right-typing',
  templateUrl: './right-typing.component.html',
  styleUrls: ['./right-typing.component.scss']
})
export class RightTypingComponent implements OnInit {

  message:string='';

  constructor(private dataService:DataService,
              private chatService:ChatService) { }

  ngOnInit(): void {

  }
  public isChatBoxSelected() {
   return this.chatService.isChatBoxSelected();
  }

  public sendTo() {
    this.chatService.sendTo(this.message);
    this.message='';
  }



}
