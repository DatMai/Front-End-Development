import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { UserModel } from 'src/app/model/userModel';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  // isSelected =false;
  selectedUser:UserModel={};
  USERLOGIN:UserModel={};
  constructor(public userService:UserService,private dataService:DataService,private router:Router){

  }


  ngOnInit(): void {
    this.USERLOGIN=JSON.parse(sessionStorage.USERLOGIN);
    // this.getNewMessage("TEST");

  }
  public setSelectedUserChatBox(user:UserModel){
    this.dataService.selectedUser$.next(user);
    this.router.navigateByUrl('home/'+user.username);
    this.selectedUser=user;
    // this.isSelected=true;
  }

  public getNewMessage(username:string){
    let chatContent =this.dataService.chatContentExample.filter((value)=>
        value.usernameTo==username

  );
  let chatContent1 = chatContent[0].messages?.map((value)=>{
    return value.message;
  }
);
  console.log(chatContent1);

      // if (chatContent.length==0) {
      //   return '';
      // }else {

      //   return '';
      // }
  }
}
