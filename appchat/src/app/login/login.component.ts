import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../model/userModel';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { WebSocketService } from '../service/web-socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',
]
})



export class LoginComponent implements OnInit {
  @Output() userEvent = new EventEmitter<UserModel>();
  message ="";
  alert="";
  user:UserModel={};
  registerPanel="";
  loginForm:FormGroup=this.createLoginForm();
  registerForm:FormGroup=this.createRegisterForm();

  constructor(private dataService:DataService,private fb:FormBuilder,private router:Router,private wss:WebSocketService,private userService:UserService )
  {
  }
  ngOnInit(): void {
  }

  createLoginForm():FormGroup{
    this.loginForm= this.fb.group({
      username:[null,Validators.required],
      password:[null,Validators.required]
    })
    return this.loginForm;
  }
  createRegisterForm():FormGroup{
    this.registerForm= this.fb.group({
      fullname:[null,Validators.required],
      username:[null,Validators.required],
      password:[null,Validators.required],
      // rePassword:[null,Validators.required],
      email:[null,Validators.required]
    },)
    return this.registerForm;
  }

  // passMatchingValidator(fg:FormGroup):Validators{
    // return fg.get('password')?.value ===fg.get('rePassword')?.value? null: {notmached:true};
  // }

  showRegisterPanel():void{
    this.registerPanel="right-panel-active";
  }
  hideRegisterPanel():void{
    this.registerPanel="";
  }

  async login(){
    let username =this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;

    await this.userService.login(username,password);

    if(this.userService.isLogin){
      this.dataService.USERLOGIN=this.userService.findByUserName(username);
      sessionStorage.setItem('USERLOGIN',JSON.stringify(this.dataService.USERLOGIN));
      this.router.navigateByUrl('home');
    }else
      this.alert="warning";
      this.message="Bạn nhập sai tên đăng nhập hoặc mật khẩu";
  }

  register(){
    this.user= Object.assign(this.user,this.registerForm.value);

    // const writeJsonFile = require('write-json-file');

    // (async () => {
    //     await writeJsonFile('userData.json',this.user);
    // })();

    // localStorage.setItem('USERS',JSON.stringify(this.users));
    // console.log(this.users);
    // this.userService.addUser(this.user);

    // console.log(this.registerForm.value);

    // this.wss.checkLogin(user, pass);
    // await this.wss.receiveMessage();

    // if(this.wss.dataFromServer.status=="success")
    //   this.router.navigateByUrl('home');
    // else
    //   console.log(this.wss.dataFromServer);
  }

}
