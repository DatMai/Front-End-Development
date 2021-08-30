import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { EmojisModel } from 'src/app/model/emojisModel';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import emojis from "../../.././data/emojis.json";
import Callback = JQuery.Deferred.Callback;
import {ResponsiveService} from "../../../service/responsive.service";
import { ImageService } from 'src/app/service/image.service';

declare var $: any;

@Component({
  selector: 'app-right-typing',
  templateUrl: './right-typing.component.html',
  styleUrls: ['./right-typing.component.scss'],
})
export class RightTypingComponent implements OnInit,AfterViewInit {
  @Input() selectedUser: UserModel = {};
  selectedGroup: GroupChat = {};
  selectedEmoji: EmojisModel = {};
  checkEmojisShow: boolean = false;
  checkGifShow: boolean = false;
  background: string = 'black';
  backgroundInput:string="#222323"
  emojisList: {
    emoji?: string;
    name?: string;
    shortname?: string;
    unicode?: string;
    html?: string;
    category?: string;
    order?: string;
  }[] = emojis;



  // emojisList: {
  //   [key: string]: {
  //       unicode: string[];
  //       fname: string;
  //       uc: string;
  //       isCanonical: boolean;
  //   }
  // }= emojione.emojioneList;

   message: string = '';

  constructor(
    private dataService: DataService,
    private chatService: ChatService,
    private imageService: ImageService,
    private res : ResponsiveService
  ) {}
  ngAfterViewInit(): void {

  }
  public sendImage(event:any){
    this.imageService.sendImage(event);
  }
  public darkMode() {
    return this.dataService.isDarkMode;
  }
  ngOnInit(): void {
    this.dataService.selectedEmoji$.subscribe(
      (value) => (this.selectedEmoji = value)
    );

    }


    public isShowTypingMobile(){
    return this.res.isMobileRes(564);
    }

  checkShowManager(){
    return this.dataService.isShowManager;
  }

  public gifClick(){
    this.checkGifShow = !this.checkGifShow;
  }
  public isChatBoxSelected() {
    return this.chatService.isChatBoxSelected();
  }
  public selectEmoji(emojis: EmojisModel) {
    this.dataService.selectedEmoji$.next({});
    this.selectedEmoji = emojis;
    console.log(this.selectEmoji);
    this.message = this.message + this.selectedEmoji.emoji;
  }
  public showEmoji() {
    $("#emotions").emojioneArea({
      // standalone:true,
      pickerPosition: "top",
      toneStyle:"bullet",
    });
    let el = $("#emotions").emojioneArea();
    let message  = $("#emotions").val();
    let m=$("#moji");
    el[0].emojioneArea.on("emojibtn.click", function(btn) {
    //  m.append(btn.html());
      console.log(m);


    });

  }

  public sendTo() {
    let message  = $("#emotions").val();
    this.message=message;
    console.log(this.message);
    this.chatService.sendTo(this.message);
    this.message = '';
  }


}
