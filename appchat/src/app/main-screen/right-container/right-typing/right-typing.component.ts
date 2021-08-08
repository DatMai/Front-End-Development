import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { EmojisModel } from 'src/app/model/emojisModel';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import emojis from "../../.././data/emojis.json";

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
  checkGifShow:boolean = false;
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
    private chatService: ChatService
  ) {}
  ngAfterViewInit(): void {
  
  }

  ngOnInit(): void {
    this.dataService.selectedEmoji$.subscribe(
      (value) => (this.selectedEmoji = value)
    );
    // console.log( $("#emotions"));
  }

  public gifClick(){
    this.checkGifShow = !this.checkGifShow;
  }
  public inputWidthIfManagerActive(){
    if(this.dataService.isShowManager){
      return "col-9";
    }else{
      return "col-10";
    }
  }
  public actionWidthIfManagerActive(){
    if(this.dataService.isShowManager){
      return "col-3";
    }else{
      return "col-2";
    }
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
    var el = $("#emotions").emojioneArea();
    var message  = $("#emotions").val();
    el[0].emojioneArea.on("emojibtn.click", function(btn) {
      console.log(btn.html());
      // message+=btn.data().name;
      $("#chatContent").html(btn.html());

    });
    // console.log(1);
    // this.checkEmojisShow = !this.checkEmojisShow;
  }

  public sendTo() {
    this.chatService.sendTo(this.message);
    this.message = '';
  }
}
