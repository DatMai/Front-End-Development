import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../../service/data.service";

@Component({
  selector: 'app-send-gif',
  templateUrl: './send-gif.component.html',
  styleUrls: ['./send-gif.component.scss']
})
export class SendGifComponent implements OnInit {
  gifs:any[] = [];

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getTrendingGifs().subscribe((respone:any) => {
      this.gifs = respone.data;
    });
  }

  sendGif(url:string){

  }


  searchGif(searchTerm:string){
    if(searchTerm !== ' '){
   this.dataService.searchGifs(searchTerm).subscribe((respone:any)=>{
     console.log(respone.data);
     this.gifs = respone.data;
   });
    }

  }

}
