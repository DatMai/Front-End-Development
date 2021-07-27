import { Component, OnInit } from '@angular/core';
import { UserModel } from './model/userModel';
import { DataService } from './service/data.service';
import { WebSocketService } from './service/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private dataService:DataService,private wss:WebSocketService ) {
  }
  ngOnInit(): void {
    this.dataService.checkLogin$.subscribe(
      value=>this.dataService.checkLogin=value
    )

    this.dataService.chatContent$.subscribe(
      value=>this.dataService.chatContentExample=value
    )

    this.dataService.selectedChatContent$.subscribe(
      value=>this.dataService.selectedChatContent=value
    )
  }
  title = 'AppChat';
  USER :UserModel=  {};
}
