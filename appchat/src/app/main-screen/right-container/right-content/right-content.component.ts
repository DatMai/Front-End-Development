import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import { ChatContent } from '../../../model/ChatContent';
import { stringify } from 'querystring';
import { GifService } from 'src/app/service/gif.service';
import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ResponsiveService } from '../../../service/responsive.service';
import { ImageService } from 'src/app/service/image.service';
import { ThemeService } from 'src/app/service/theme.service';
import { SearchMessageService } from 'src/app/service/search-message.service';

declare var $: any;
@Component({
  selector: 'app-right-content',
  templateUrl: './right-content.component.html',
  styleUrls: ['./right-content.component.scss'],
  animations: [
    trigger('messagesAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-30px)' }),
        animate('0.3s', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class RightContentComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('scrollframe', { static: false }) scrollFrame?: ElementRef;
  @ViewChildren('item') itemElements?: QueryList<any>;
  private scrollContainer: any;
  background: string = 'black';
  isDarkMode: boolean = true;
  USERLOGIN: UserModel = {};
  arrayKeyWord: string[] = [];
  backgroundText: string = '';
  colorText: string = '#a5a5a5';
  autoScroll: boolean = true;
  keyWord: string = '';

  constructor(
    private dataService: DataService,
    private chatService: ChatService,
    private gifService: GifService,
    private imageService: ImageService,
    private themeService: ThemeService,
    private res: ResponsiveService,
    private searchMessageService: SearchMessageService
  ) {}

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame?.nativeElement;
    this.itemElements?.changes.subscribe((_) => this.onItemElementsChanged());
  }
  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {
    this.dataService.searchMessage$.subscribe((text) => (this.keyWord = text));

  }

  public checkScroll() {
    this.autoScroll = false;
  }

  public darkMode() {
    return this.dataService.isDarkMode;
  }

  public getId(id: any, highlight: boolean): string {
    let getTextId = 'text' + id;
    let element = document.getElementsByClassName('highlight');
    if (highlight) {
      if (element.length != this.dataService.searchKeyWord.length) {
        this.dataService.searchKeyWord.push(getTextId);
      }
    }
    // console.log(this.dataService.searchKeyWord);
    return getTextId;
  }

  public close() {
    this.dataService.isShowSearchMessage = false;
    this.dataService.selectedChatContent.messages?.forEach((f) => {
      f.highlight = false;
    });
    this.searchMessageService.searchIndex = 0;
  }
  public getResultSearchMessageCount(): any {
    let count = 0;
    count = this.searchMessageService.searchMessage(this.keyWord).length;
    return count;
  }
  public isShowSearchMessage() {
    return this.dataService.isShowSearchMessage;
  }
  public findUp() {
    this.searchMessageService.sortById();
    if (    this.searchMessageService.searchIndex < this.dataService.searchKeyWord.length) {
      document
        .getElementById(this.dataService.searchKeyWord[this.searchMessageService.searchIndex++])
        ?.scrollIntoView();
    }
    console.log(this.searchMessageService.searchIndex);
  }
  public findDown() {
    this.searchMessageService.sortById();

    if (this.searchMessageService.searchIndex >= 0  ) {
    document
      .getElementById(this.dataService.searchKeyWord[this.searchMessageService.searchIndex--])
      ?.scrollIntoView();
    }
    console.log(this.searchMessageService.searchIndex);
  }


  public getSelectedChatContent() {
    return this.dataService.getSelectedChatContent();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'auto',
    });
  }

  public typeOfMes(index: number): string {
    let chatContent: ChatContent = this.getSelectedChatContent();
    let listMessages: any = chatContent.messages;
    try {
      if (index == 0) {
        if (
          JSON.stringify(listMessages[index].userName) ==
          JSON.stringify(listMessages[index + 1].userName)
        ) {
          return 'begin';
        }
      }
      if (index == listMessages.length - 1) {
        if (
          JSON.stringify(listMessages[index].userName) ==
          JSON.stringify(listMessages[index - 1].userName)
        ) {
          return 'end';
        }
      }
      if (
        JSON.stringify(listMessages[index].userName) !=
        JSON.stringify(listMessages[index - 1].userName)
      ) {
        if (
          JSON.stringify(listMessages[index].userName) ==
          JSON.stringify(listMessages[index + 1].userName)
        ) {
          return 'begin';
        }
      }
      if (
        JSON.stringify(listMessages[index].userName) !=
        JSON.stringify(listMessages[index + 1].userName)
      ) {
        if (
          JSON.stringify(listMessages[index].userName) ==
          JSON.stringify(listMessages[index - 1].userName)
        ) {
          return 'end';
        }
      }
      if (
        JSON.stringify(listMessages[index].userName) ==
        JSON.stringify(listMessages[index + 1].userName)
      ) {
        if (
          JSON.stringify(listMessages[index].userName) ==
          JSON.stringify(listMessages[index - 1].userName)
        ) {
          return 'between';
        }
      }
    } catch (e) {}
    return 'single';
  }

  public isShowName(index: number) {
    if (this.typeOfMes(index) == 'begin' || this.typeOfMes(index) == 'single') {
      return true;
    }
    return false;
  }
  public isShowAvatar(index: number) {
    if (this.typeOfMes(index) == 'end' || this.typeOfMes(index) == 'single') {
      return true;
    }
    return false;
  }

  public getDate(time: string) {
    // console.log(time);
    let rs: string = '';
    let thatday = new Date(time);
    let today = new Date();
    let timers: string = '';

    timers +=
      thatday.getHours() +
      ':' +
      (thatday.getUTCMinutes() >= 10
        ? thatday.getUTCMinutes()
        : '0' + thatday.getUTCMinutes());
    //Thời gian xa ,định dạng mm/dd/yyyy hh:mm
    rs = thatday.toLocaleDateString() + ' ' + timers;

    //số ngày trong mỗi tháng
    var dayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //xét trường hợp năm nhuận
    if (today.getFullYear() % 400 == 0) {
      dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
      if (today.getFullYear() % 4 == 0) {
        dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      }
    }

    //Thời gian gần (trong 1 tuần) , định dạng : Thứ .. giờ:phút
    var days = [
      'Chủ nhật',
      'Thứ 2',
      'Thứ 3',
      'Thứ 4',
      'Thứ 5',
      'Thứ 6',
      'Thứ 7',
    ];

    if (thatday.getFullYear() == today.getFullYear()) {
      //cùng tuần cùng tháng
      if (thatday.getMonth() == today.getMonth()) {
        if (today.getDate() == thatday.getDate()) {
          rs = timers;
        } else if (today.getDate() - thatday.getDate() < 7) {
          rs = days[thatday.getDay()] + ' ' + timers;
        }
      }
      //cùng tuần khác tháng
      if (today.getMonth() - thatday.getMonth() == 1) {
        let todayDate = dayOfMonth[thatday.getMonth()] + today.getDate();
        if (todayDate - thatday.getDate() < 7) {
          rs = days[thatday.getDay()] + ' ' + timers;
        }
      }
    }
    return rs;
  }

  public isGif(message: string) {
    return this.gifService.isGif(message);
  }
  public isImage(message: string) {
    return this.imageService.isImage(message);
  }
  public isNofication(messages: any) {
    return this.chatService.isNofication(messages);
  }
  public isMes(messages: any) {
    return this.chatService.isMes(messages);
  }

  public zoomImage($event) {
    let src = $event.srcElement.src;
    this.imageService.selectedImgSrc = src;
    this.imageService.isShowImageModal = true;
  }
}
