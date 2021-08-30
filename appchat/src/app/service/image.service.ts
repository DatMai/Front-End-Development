import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
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
  public isImage(message:string){
    let startUrl= "https://firebasestorage.googleapis.com/v0/b/appchat-b16ea.appspot.com/o/image"
    let re = new RegExp(startUrl);
    if (re.test(message)) return true;
    return false;
  }
}
