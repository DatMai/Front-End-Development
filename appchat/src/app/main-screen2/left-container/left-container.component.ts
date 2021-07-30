import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/userModel';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-left-container',
  templateUrl: './left-container.component.html',
  styleUrls: ['./left-container.component.css']
})
export class LeftContainerComponent implements OnInit {
  USERLOGIN:UserModel= {};
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.USERLOGIN=JSON.parse(sessionStorage.USERLOGIN);
  }

}
