import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { UserModel } from 'src/app/model/userModel';
import { ChatService } from 'src/app/service/chat.service';
import { DataService } from 'src/app/service/data.service';
import {ChatContent} from "../../../model/ChatContent";
import {stringify} from "querystring";

declare var $:any;
@Component({
  selector: 'app-right-content',
  templateUrl: './right-content.component.html',
  styleUrls: ['./right-content.component.scss']
})
export class RightContentComponent implements OnInit, OnChanges, AfterViewInit {
  USERLOGIN:UserModel={ };

  constructor(
    private dataService:DataService,
    private chatService:ChatService
    ){
    }

  ngAfterViewInit(): void {
        this.addCss();
    }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit(): void {
    // this.USERLOGIN=JSON.parse(sessionStorage.USERLOGIN);
    console.log("ready UI");
  }


  public getSelectedChatContent() {
    return this.dataService.getSelectedChatContent();
  }

  public goToBottom(){
    let bottomPoint =(document.getElementById('chatContent')||document.body);
    bottomPoint.scrollTo(0,bottomPoint.scrollHeight);
  }

  public typeOfMes(index:number) : string {
    let chatContent: ChatContent = this.getSelectedChatContent();
    let listMessages: any = chatContent.messages;
    try{
    if(index == 0){
      if(JSON.stringify(listMessages[index].userName) == JSON.stringify(listMessages[index + 1].userName)){
        return "begin"
      }
    }
    if(index == listMessages.length-1) {
      if(JSON.stringify(listMessages[index].userName) == JSON.stringify(listMessages[index - 1].userName)){
        return "end"
      }
    }
    if (JSON.stringify(listMessages[index].userName) != JSON.stringify(listMessages[index - 1].userName)) {
      if (JSON.stringify(listMessages[index].userName) == JSON.stringify(listMessages[index + 1].userName)) {
        return "begin"
      }
    }
    if (JSON.stringify(listMessages[index].userName) != JSON.stringify(listMessages[index + 1].userName)) {
      if (JSON.stringify(listMessages[index].userName) == JSON.stringify(listMessages[index - 1].userName)){
        return "end"
      }
    }
      if (JSON.stringify(listMessages[index].userName) == JSON.stringify(listMessages[index + 1].userName)) {
        if (JSON.stringify(listMessages[index].userName) == JSON.stringify(listMessages[index - 1].userName)){
          return "between"
        }
      }
    }catch (e) {

    }
 return "single"
  }

  public isShowName(index:number){
    if(this.typeOfMes(index) == "begin"  || this.typeOfMes(index) == "single"){
      return true;
    }
    return false;
  }
  public isShowAvatar(index:number){
    if(this.typeOfMes(index) == "end"  || this.typeOfMes(index) == "single"){
      return true;
    }
    return false;
  }
  public addCss(){
    // let parent = document.querySelectorAll(".begin");
    // let partner__text = document.querySelector("/p")
  }
  public getDate(time:string){
    // console.log(time);
    let rs:string ='';
    let thatday = new Date(time);
    let today = new Date();
    let timers:string = '';

    timers+=thatday.getHours()+':'+(thatday.getUTCMinutes()>=10?thatday.getUTCMinutes():'0'+thatday.getUTCMinutes());
    //Thời gian xa ,định dạng mm/dd/yyyy hh:mm
    rs = thatday.toLocaleDateString() +' ' + timers;

    //số ngày trong mỗi tháng
    var dayOfMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    //xét trường hợp năm nhuận
    if (today.getFullYear()%400==0){
        dayOfMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
    }else{
      if (today.getFullYear()%4==0) {
        dayOfMonth = [31,29,31,30,31,30,31,31,30,31,30,31];
      }
    }

    //Thời gian gần (trong 1 tuần) , định dạng : Thứ .. giờ:phút
    var days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

    if (thatday.getFullYear()==today.getFullYear()) {
      //cùng tuần cùng tháng
      if (thatday.getMonth()==today.getMonth()){
        if ((today.getDate()==thatday.getDate())) {
          rs=timers;
        }else if ((today.getDate()-thatday.getDate())<7) {
            rs=days[thatday.getDay()]+' '+timers;
        }
      }
      //cùng tuần khác tháng
        if ((today.getMonth()-thatday.getMonth())==1){
          let todayDate = dayOfMonth[thatday.getMonth()]+today.getDate();
          if (todayDate-thatday.getDate()<7) {
            rs=days[thatday.getDay()]+' '+timers;
        }
      }
    }
    return rs;

  }


}
