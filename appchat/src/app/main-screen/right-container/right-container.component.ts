import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import {DataService} from "../../service/data.service";
import {animate, state, transition, trigger, style} from "@angular/animations";
import {inspect} from "util";

@Component({
  selector: 'app-right-container',
  templateUrl: './right-container.component.html',
  styleUrls: ['./right-container.component.scss'],
  animations:[
    trigger('rightManagerAnimation',[
      transition(':enter', [
        style({ width:"0%", opacity:0 }),
        animate('0.2s', style({ width:"350px"})),
        animate('0.3s', style({opacity:1})),
      ]),
      transition(':leave', [
        animate('0.2s', style({ opacity: 0 }))
      ])
    ]),
      trigger('leftSectionAnimation',[
     state('small',style({
       width: "calc(100vw - 350px - 350px)"
     })),
      state('large',style({
        width:'calc(100vw - 350px)'
      })),
      state('large-m',style({
        width:'calc(100vw)'

      })),
      state('small-m',style({
        width: "calc(100vw)"
      })),
      transition('small => large', animate('0.3s')),
      transition('large => small', animate('0.3s')),
      transition('small-m => large-m', animate('0.3s')),
      transition('large-m => small-m', animate('0.3s')),
      transition('small-m => large', animate('0.3s')),
      transition('large-m => small', animate('0.3s')),
      transition('small-m => small', animate('0.3s')),
      transition('small => small-m', animate('0.3s')),
      transition('large-m => large', animate('0.3s')),
      transition('large => large-m', animate('0.3s')),

    ])
  ]
})
export class RightContainerComponent implements OnInit {

  constructor(private chatService:ChatService, private dataService:DataService){ }

  ngOnInit(): void {

  }
  public hideManager(){
    this.dataService.isShowManager = false;
  }

  public isSelectedChatBox(){
    return this.chatService.isChatBoxSelected();
  }
  public isShowManager(){
    return this.dataService.isShowManager;
  }
  public leftSectionState(){
    if(window.innerWidth < 992){
      return this.isShowManager()? "small-m" : "large-m";
    }
    else return this.isShowManager()? "small" : "large";
  }


}
