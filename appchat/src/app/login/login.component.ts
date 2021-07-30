import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../model/userModel';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { WebSocketService } from '../service/web-socket.service';
// declare const writeFile:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() userEvent = new EventEmitter<UserModel>();
  message = '';
  alert = '';
  user: UserModel = {};
  registerPanel = '';
  loginForm: FormGroup = this.createLoginForm();
  registerForm: FormGroup = this.createRegisterForm();
  alertCheckSuccess: boolean = false;
  alertCheckFail: boolean = false;

  register_form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    registerName: new FormControl('', Validators.required),
    registerPassword: new FormControl('', Validators.required),
  });
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router,
    private wss: WebSocketService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.userService.message.subscribe((value) => (this.message = value));
    this.userService.alert.subscribe((value) => (this.alert = value));
  }

  createLoginForm(): FormGroup {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
    return this.loginForm;
  }
  createRegisterForm(): FormGroup {
    this.registerForm = this.fb.group({
      fullname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      // rePassword:[null,Validators.required],
      email: [null, Validators.required],
    });
    return this.registerForm;
  }

  // passMatchingValidator(fg:FormGroup):Validators{
  // return fg.get('password')?.value ===fg.get('rePassword')?.value? null: {notmached:true};
  // }

  showRegisterPanel(): void {
    this.registerPanel = 'right-panel-active';
  }
  hideRegisterPanel(): void {
    this.registerPanel = '';
  }

  login() {
    let username = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;
    this.userService.login(username, password);
    // this.dataService.checkLogin$.subscribe(data=>{
    // console.log(this.dataService.checkLogin);
    // // if (data.event!=undefined){
    // if(this.dataService.checkLogin){
    //   this.dataService.USERLOGIN=this.userService.findByUserName(username);
    //   sessionStorage.setItem('USERLOGIN',JSON.stringify(this.dataService.USERLOGIN));
    //   // this.alert.next("");
    //   // this.message.next("");
    //   this.router.navigateByUrl('home');
    // }else{
    //   this.alert="warning";
    //   this.message="Bạn nhập sai tên đăng nhập hoặc mật khẩu";
    // }
  }

  async register() {
    let user = this.register_form.value.registerName;
    let pass = this.register_form.value.registerPassword;

    this.wss.checkRegister(user, pass);
    await this.wss.receiveMessage();

    if (this.wss.dataFromServer.status == 'success') {
      this.alertCheckSuccess = true;
      this.alertCheckFail = false;
    } else {
      console.log(this.wss.dataFromServer);
      this.alertCheckFail = true;
      this.alertCheckSuccess = false;
    }
  }
}
