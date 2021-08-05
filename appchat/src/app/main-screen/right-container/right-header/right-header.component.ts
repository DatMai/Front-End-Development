import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-right-header',
  templateUrl: './right-header.component.html',
  styleUrls: ['./right-header.component.scss']
})
export class RightHeaderComponent implements OnInit {


  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }
  public getSelectedChatContent() {
    return this.dataService.getSelectedChatContent();
  }
  public showManager(){
    let a = document.getElementById('right-manager')||document.body;
    a.style.display='block';
  }
}
