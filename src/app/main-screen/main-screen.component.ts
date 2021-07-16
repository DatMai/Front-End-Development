import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/userModel';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  USERLOGIN:UserModel= {};

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.USERLOGIN=JSON.parse(sessionStorage.USERLOGIN);
  }

}
