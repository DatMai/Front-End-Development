import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-right-header',
  templateUrl: './right-header.component.html',
  styleUrls: ['./right-header.component.scss'],
  animations:[
    trigger('headerAnimation',[
      transition(':enter',[
        style({
        opacity:0,
        transform :'translateX(-1vw)'
      }),
        animate("0.3s",style({
          opacity:1,
          transform:'translateX(0)'
        }
        )
        )]),
      transition(':leave',[
        animate("0.3s",style({
          opacity:0,
          transform:'translateX(1vw)'
        }))])
    ]),
    trigger('iconAnimation',[
      transition(':enter',[
        style({
          opacity:0,
          transform: 'translateX(1vw)'
        }),
        animate("0.3s",style({
            opacity:1,
            transform:'translateX(0)'
          }
          )
        )
      ])
    ])
  ]
})
export class RightHeaderComponent implements OnInit {


  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }
  public getSelectedChatContent() {
    return this.dataService.getSelectedChatContent();
  }
  public showManager(){
    this.dataService.isShowManager=!this.dataService.isShowManager;
  }

}
