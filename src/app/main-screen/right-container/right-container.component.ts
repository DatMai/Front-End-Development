import { Component, Input, OnInit, Output } from '@angular/core';
import { ChatContent } from 'src/app/model/ChatContent';
import { UserModel } from 'src/app/model/userModel';
import { DataService } from 'src/app/service/data.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-right-container',
  templateUrl: './right-container.component.html',
  styleUrls: ['./right-container.component.css']
})
export class RightContainerComponent implements OnInit {
  @Output() USERLOGIN:UserModel ={};
  @Output() selectedUser:UserModel ={};
  @Output() chatContent:ChatContent[] =[];
  constructor(private wss:WebSocketService,private dataService:DataService) {
  }

  ngOnInit(): void {

    this.dataService.selectedUser$.subscribe(value=>
      {
      this.selectedUser=value;
      }
    );
    this.dataService.chatContent$.subscribe(value=>
      {
      this.chatContent=value;
      this.USERLOGIN.chatContents=value;
      }
      // }
    );
  }

}
