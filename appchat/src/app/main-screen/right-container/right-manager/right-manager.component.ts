import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/service/data.service';
import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";
import theme from "../../../data/theme.json";
import { ThemeModel } from 'src/app/model/ThemeModel';
import { ImageService } from 'src/app/service/image.service';

import { ResponsiveService } from 'src/app/service/responsive.service';

@Component({
  selector: 'app-right-manager',
  templateUrl: './right-manager.component.html',
  styleUrls: ['./right-manager.component.scss'],
  // animations: [
  //   trigger('listAnimation',[
  //     state('hide',style({
  //       opacity:0,
  //       transform:"translateX(30px)",
  //       height:"0px"
  //
  //     })),
  //     transition('hide => show',[
  //       animate('0.3s',style({
  //         opacity:1,
  //         transform:"translateX(0px)",
  //         height:"fit-content",
  //       }))
  //     ]),
  //     transition('show => hide',[
  //       animate('0.3s',style({
  //         opacity:0,
  //         transform:"translateX(30px)",
  //         height:"0px",
  //       }))
  //     ])
  //   ])
  // ]
  animations:[
    trigger("listAnimation",[

      transition(':enter',[
        query('.list__item', style({opacity:0}),{optional:true}),
        query('.list__item', stagger('50ms',[
          animate('0.3s', keyframes([
            style({opacity:0, transform: "translateX(10px)",offset: 0}),
            style({opacity:1, transform: "translateX(0px)",offset: 1}),
          ]))
        ]),{optional:true})
      ]),
      transition(':leave',[
        query('.list__item', style({opacity:1}),{optional:true}),
        query('.list__item', stagger('50ms',[
          animate('0.3s', keyframes([
            style({opacity:1, transform: "translateX(0px)",offset: 0}),
            style({opacity:0, transform: "translateX(10px)",offset: 1}),
          ]))
        ]),{optional:true})
      ])
    ]),
    ],
})
export class RightManagerComponent implements OnInit {
  isShowChatSetting:boolean = false;
  isShowChatSharing:boolean = false;
  isShowChatPrivate: boolean = false;
  background: string = "#221c1f";
  backgroundText: string = '';
  colorText: string = '#a5a5a5';
  themeList:ThemeModel[] = theme;

  constructor(private dataService:DataService,private imageService: ImageService,
              private  res : ResponsiveService

    ) { }

  ngOnInit(): void {

  }


 public listState(flag:boolean){
    return flag? 'show':'hide';
  }

  public isActive(bol :boolean){
    if(bol == true){
      return "active";
    }else{
      return "deactive";
    }
  }

  public clickEffect(){
  }

  public isShowTheBackButton(){
    return this.res.isMobileRes(564)
  }

  public hideManager(){
    this.dataService.isShowManager = false;
  }

  public getSelectedChatContent() {
    return this.dataService.getSelectedChatContent();
  }
  public isShowUserList() {
    return this.getSelectedChatContent().isGroup;
  }

  public showChatSetting(){
    this.isShowChatSetting = !this.isShowChatSetting
  }
  public showChatSharing(){
    this.isShowChatSharing = !this.isShowChatSharing
  }
  public showChatPrivate(){
    this.isShowChatPrivate = !this.isShowChatPrivate
    this.getListTop3Images();
  }

  //Lấy tất cả đường dẫn ảnh từ nhóm chat đang được chọn
  public getAllImageStringFromSelectedChatContent(){
    return this.imageService.getAllImageStringFromChatContent(this.dataService.selectedChatContent);
  }
  //Lấy từng bộ 3 ảnh
  public getListTop3Images(){
    let result : list3Images[] = [];
    let j = 0;
    let pictures :list3Images = new list3Images();
    let allImagesString : string[] = this.getAllImageStringFromSelectedChatContent();
    for(let i = 0; i < allImagesString.length; i++){
      j++
      if(j == 3){
        result.push(pictures);
        pictures = new list3Images();
        j=0;
      }
      pictures.images?.push(allImagesString[i]);
    }
    return result;
  }
}
