import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ChatContent } from '../model/ChatContent';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  refImage:string ="";
  selectedImgSrc="";
  isShowImageModal=false;
  constructor(
    private http : HttpClient,
    private af : AngularFireStorage,
    private chatService: ChatService) { }
  public async fileUpload(event:any){
    let selectedFiles:string = event.target.files[0];
     let storage = this.af.storage;
     let fileName :string = "/image"+Math.random()+".jpg"
      let downloadURL = "gs://appchat-b16ea.appspot.com"+fileName
     await this.af.upload(fileName,selectedFiles);
      this.refImage = downloadURL
      console.log(storage);

    }


  public callback () {
    let gsReference = this.af.storage.refFromURL(this.refImage);
    gsReference.getDownloadURL().then((url)=>{
      this.chatService.sendTo(url);
    })
   }
   public async sendImage(event:any){
    await this.fileUpload(event);
    this.callback();
  }
  //Kiểm tra xem tin nhắn có phải là ảnh không
  public isImage(message:string){
    let startUrl= "https://firebasestorage.googleapis.com/v0/b/appchat-b16ea.appspot.com/o/image"
    let re = new RegExp(startUrl);
    if (re.test(message)) return true;
    return false;
  }
  //Lấy tất cả đường dẫn  ảnh được gửi trong 1 nhóm chat
  public getAllImageStringFromChatContent(chatContent: ChatContent){
    let rs:string[]=[];
    chatContent.messages?.forEach(element => {
      if (this.isImage(element.message)) {
        rs.push(element.message);
      }
    });
    return rs;
  }
}
