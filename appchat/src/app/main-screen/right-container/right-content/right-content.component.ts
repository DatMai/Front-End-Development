import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-right-content',
  templateUrl: './right-content.component.html',
  styleUrls: ['./right-content.component.scss']
})
export class RightContentComponent implements OnInit {
  USERLOGIN:UserModel={ };

  constructor(
    private dataService:DataService,
    private chatService:ChatService
    ){ }
  ngOnInit(): void {
    // this.USERLOGIN=JSON.parse(sessionStorage.USERLOGIN);
  }

  public getSelectedChatContent() {
    return this.dataService.getSelectedChatContent();
  }
 
  public goToBottom(){
    let bottomPoint =(document.getElementById('chatContent')||document.body);
    bottomPoint.scrollTo(0,bottomPoint.scrollHeight);
  }

}
