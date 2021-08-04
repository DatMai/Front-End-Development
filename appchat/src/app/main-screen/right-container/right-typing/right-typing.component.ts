import { Component, Input, OnInit } from '@angular/core';
import { EmojisModel } from 'src/app/model/emojisModel';
import { GroupChat } from 'src/app/model/GroupChat';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import emojis from "../../.././data/emojis.json";
@Component({
  selector: 'app-right-typing',
  templateUrl: './right-typing.component.html',
  styleUrls: ['./right-typing.component.scss'],
})
export class RightTypingComponent implements OnInit {
  @Input() selectedUser: UserModel = {};
  selectedGroup: GroupChat = {};
  selectedEmoji: EmojisModel = {};
  checkEmojisShow: boolean = false;
  emojisList: {
    emoji?: string;
    name?: string;
    shortname?: string;
    unicode?: string;
    html?: string;
    category?: string;
    order?: string;
  }[] = emojis;

  message: string = '';

  constructor(
    private dataService: DataService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.dataService.selectedEmoji$.subscribe(
      (value) => (this.selectedEmoji = value)
    );

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
  public emojisClick() {
    this.checkEmojisShow = !this.checkEmojisShow;
  }

  public sendTo() {
    this.chatService.sendTo(this.message);
    this.message = '';
  }
}
