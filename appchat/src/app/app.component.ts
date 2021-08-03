import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from './model/userModel';
import { DataService } from './service/data.service';
import { WebSocketService } from './service/web-socket.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {

  constructor(private dataService:DataService,private wss:WebSocketService ) {
  }
  ngOnDestroy(): void {
    this.wss.closeWebsocket();
  }
  ngOnInit(): void {
    // this.wss.createWebsocket(environment.WESOCKET_URL);
   
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
