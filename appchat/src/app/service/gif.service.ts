import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GifService {
  listGifs:any[]=[];


  constructor(private http:HttpClient) {

  }
  getTrendingGifs(){
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=${environment.giphyApiKey}`);
  }
  searchGifs(searchTerm:string){
    return this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${environment.giphyApiKey}&q=${searchTerm}"&limit=25&offset=0&rating=g&lang=en`)
  }


  public isGif(message:string){
    let startUrl="https://media[0-9].giphy.com/media/.";
    let re = new RegExp(startUrl);
    if (re.test(message)) return true;
    return false;
    }
}
