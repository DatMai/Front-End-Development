import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',
]
})



export class LoginComponent implements OnInit {

  registerPanel="";


  user?:any[];
  checkLogin=false;

  constructor() { }

  ngOnInit(): void {
      this.user=[
      [["doan"],["1"]],[["dat"],["1"]]
      ]
  }
  showRegisterPanel():void{
    this.registerPanel="right-panel-active";
  }
  hideRegisterPanel():void{
    this.registerPanel="";
  }

  login():void{

  }
}
