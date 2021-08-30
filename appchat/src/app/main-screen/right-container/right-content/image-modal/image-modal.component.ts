import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {


  constructor(private imageService:ImageService) { }

  ngOnInit(): void {
  }
  public showModal(){

  }
  public getSelectedSrc(){
    return this.imageService.selectedImgSrc;
  }
  public hideModal(){
    this.imageService.isShowImageModal=false;
  }
  public isShowImageModal(){
    return this.imageService.isShowImageModal;
  }
}
